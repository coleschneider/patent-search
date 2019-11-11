import React from 'react'
import { schema, normalize } from 'normalizr'
import { companySearch, companyPatents } from '../../utils/service'

const { FETCH_COMPANIES, FETCH_COMPANIES_COMPLETE, FETCH_COMPANIES_ERROR }: CompanyActionTypes = {
  FETCH_COMPANIES: 'FETCH_COMPANIES',
  FETCH_COMPANIES_COMPLETE: 'FETCH_COMPANIES_COMPLETE',
  FETCH_COMPANIES_ERROR: 'FETCH_COMPANIES_ERROR',
}
const { FETCH_PATENTS, FETCH_PATENTS_COMPLETE, FETCH_PATENTS_ERROR }: PatentActionTypes = {
  FETCH_PATENTS: 'FETCH_PATENTS',
  FETCH_PATENTS_COMPLETE: 'FETCH_PATENTS_COMPLETE',
  FETCH_PATENTS_ERROR: 'FETCH_PATENTS_ERROR',
}
interface Paginate {
  types: CompanyActionTypesUnion[] | PatentActionTypesUnion[]
  mapActionToKey: (action: Actions) => string | number
}

const paginate = ({ types, mapActionToKey }: Paginate) => {
  const [requestType, successType, failureType] = types
  const updatePagination = (
    state = {
      ids: [],
      isFetching: true,
      errors: null,
      page: 1,
      count: 0,
      total: 0,
    },
    action: Actions,
  ) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          page: action.meta.page,
          isFetching: true,
        }
      case successType:
        return {
          ...state,
          count: action.payload.count,
          total: action.payload.total,
          // ids: [...state.ids, ...action.payload.ids],
          ids: _.union(state.ids, action.payload.ids),
          isFetching: false,
        }
      case failureType:
        return {
          ...state,
          isFetching: false,
        }
      default:
        return state
    }
  }
  return (state = {}, action: Actions) => {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action)
        console.log(key)
        if (typeof key !== 'string') {
          throw new Error('expecteed key to be a string')
        }
        return {
          ...state,
          [key]: updatePagination(state[key], action),
        }
      default:
        return state
    }
  }
}

const initialState: State = {
  companySearches: {},
  patentsByCompany: {},
  errorMessage: null,
}
const companySchema = new schema.Entity(
  'companies',
  {},
  {
    idAttribute: company => {
      return company.assignee_id
    },
  },
)
const patentSchema = new schema.Entity(
  'patents',
  {},
  {
    idAttribute: patent => {
      return patent.patent_id
    },
  },
)
const companySearchesReducer = paginate({
  types: [FETCH_COMPANIES, FETCH_COMPANIES_COMPLETE, FETCH_COMPANIES_ERROR],
  mapActionToKey: (actionType: Actions) => {
    console.log(actionType)
    return actionType.meta.search
  },
})

const patentsByCompanyReducer = paginate({
  types: [FETCH_PATENTS, FETCH_PATENTS_COMPLETE, FETCH_PATENTS_ERROR],
  mapActionToKey: (actionType: Actions) => actionType.meta.companyUrl,
})

function useCompanies() {
  const entities = (state = { companies: {}, patents: {} }, action) => {
    if (action.payload && action.payload.entities) {
      return _.merge({}, state, action.payload.entities)
    }

    return state
  }

  const errorMessage = (state, action) => {
    if (action.type === 'SET_ERROR') {
      return action.message
    }
    return state
  }
  const rootReducer = (state: State, action: Actions) => {
    return {
      companySearches: companySearchesReducer(state.companySearches, action),
      patentsByCompany: patentsByCompanyReducer(state.patentsByCompany, action),
      entities: entities(state.entities, action),
      errorMessage: errorMessage(state.errorMessage, action),
    }
  }
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const fetchCompanies = (search: string, page: number) =>
    dispatch({
      type: FETCH_COMPANIES,
      meta: { page, search },
    })

  const fetchCompaniesComplete = (payload, search: string, page: number) => {
    dispatch({
      type: FETCH_COMPANIES_COMPLETE,
      payload,
      meta: {
        search,
        page,
      },
    })
  }
  const fetchCompaniesError = (errors: any) =>
    dispatch({
      type: FETCH_COMPANIES_ERROR,
      errors,
    })
  const setErrorMessage = (message: any) =>
    dispatch({
      type: 'SET_ERROR',
      message,
    })

  const getCompaniesByName = async (search: string, page = 1) => {
    fetchCompanies(search, page)
    try {
      const { data } = await companySearch(search, page)
      if (!data.assignees) {
        setErrorMessage('Not Found')
      }
      const { entities, result } = normalize(data.assignees || [], [companySchema])
      fetchCompaniesComplete(
        { ids: result, entities, count: data.count, total: data.total_assignee_count },
        search,
        page,
      )
    } catch (e) {
      fetchCompaniesError(e)
    }
  }
  const fetchPatents = (companyUrl: string, search: string, page: number) =>
    dispatch({
      type: FETCH_PATENTS,
      meta: {
        search,
        page,
        companyUrl,
      },
    })
  const fetchPatentsComplete = (payload, companyUrl: string, search: string, page: number) =>
    dispatch({
      type: FETCH_PATENTS_COMPLETE,
      payload,
      meta: {
        search,
        companyUrl,
        page,
      },
    })
  const fetchPatentsError = (error: any) =>
    dispatch({
      type: FETCH_PATENTS_ERROR,
      error,
    })
  const getPatentsByCompany = async (companyUrl: string, search: string, page = 1) => {
    fetchPatents(companyUrl, search, page)
    try {
      const { data } = await companyPatents(search, page)
      const { entities, result } = normalize(data.patents || [], [patentSchema])
      fetchPatentsComplete(
        { ids: result, entities, count: data.count, total: data.total_patent_count },
        companyUrl,
        search,
        page,
      )
    } catch (e) {
      fetchPatentsError(e)
    }
  }
  const profileByCompany = (search: string) => state.companySearches[search] || { ids: [] }
  const getCompaniesById = (id: string) => state.entities.companies[id]
  const patentsByCompany = (companyUrl: string) => state.patentsByCompany[companyUrl] || { ids: [] }
  const getPatentById = (id: string) => state.entities.patents[id]
  return {
    state,
    getCompaniesByName,
    profileByCompany,
    getCompaniesById,
    getPatentsByCompany,
    patentsByCompany,
    getPatentById,
  }
}

export default useCompanies
