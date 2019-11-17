import React from 'react'
import * as _ from 'lodash'
import paginate from './paginate'
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
const { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE }: ErrorMessageActionTypes = {
  SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
  CLEAR_ERROR_MESSAGE: 'CLEAR_ERROR_MESSAGE',
}

const initialState: State = {
  companySearches: {},
  patentsByCompany: {},
  errorMessage: null,
  entities: { companies: {}, patents: {} },
}

const companySearchesReducer = paginate({
  types: [FETCH_COMPANIES, FETCH_COMPANIES_COMPLETE, FETCH_COMPANIES_ERROR],
  mapActionToKey: (actionType: Actions) => actionType.meta.search,
})

const patentsByCompanyReducer = paginate({
  types: [FETCH_PATENTS, FETCH_PATENTS_COMPLETE, FETCH_PATENTS_ERROR],
  mapActionToKey: (actionType: Actions) => actionType.meta.companyUrl,
})

function useCompanies() {
  const entitiesReducer = (state: EntityState, action: Actions) => {
    if (action.hasOwnProperty('payload') && action.payload.entities) {
      return _.merge({}, state, action.payload.entities)
    }
    return state
  }

  const errorMessage = (state: ErrorMessageState, action: Actions) => {
    if (action.type === 'SET_ERROR_MESSAGE') {
      return action.payload.message
    }
    return state
  }
  const rootReducer = (state: State, action: Actions) => {
    return {
      companySearches: companySearchesReducer(state.companySearches, action),
      patentsByCompany: patentsByCompanyReducer(state.patentsByCompany, action),
      entities: entitiesReducer(state.entities, action),
      errorMessage: errorMessage(state.errorMessage, action),
    }
  }
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const fetchCompanies = (search: string, page: number) =>
    dispatch({
      type: FETCH_COMPANIES,
      meta: { page, search },
    })

  const fetchCompaniesComplete = (payload: CompanySearchResponse, search: string, page: number) => {
    dispatch({
      type: FETCH_COMPANIES_COMPLETE,
      payload,
      meta: {
        search,
        page,
      },
    })
  }
  const fetchCompaniesError = (error: string, search: string, page: number) =>
    dispatch({
      type: FETCH_COMPANIES_ERROR,
      error,
      meta: {
        search,
        page,
      },
    })
  const setErrorMessage = (message: string) =>
    dispatch({
      type: SET_ERROR_MESSAGE,
      payload: { message },
    })
  const clearErrorMessage = () =>
    dispatch({
      type: CLEAR_ERROR_MESSAGE,
    })

  const getCompaniesByName = async (search: string, page = 1) => {
    fetchCompanies(search, page)
    try {
      const { data } = await companySearch(search, page)

      fetchCompaniesComplete(data, search, page)
    } catch (e) {
      const { response } = e
      fetchCompaniesError(response.statusText, search, page)
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
  const fetchPatentsComplete = (payload: PatentSearchResponse, companyUrl: string, search: string, page: number) =>
    dispatch({
      type: FETCH_PATENTS_COMPLETE,
      payload,
      meta: {
        search,
        companyUrl,
        page,
      },
    })
  const fetchPatentsError = (error: string, companyUrl: string, search: string, page: number) =>
    dispatch({
      type: FETCH_PATENTS_ERROR,
      error,
      meta: {
        companyUrl,
        search,
        page,
      },
    })
  const getPatentsByCompany = async (companyUrl: string, search: string, page: number) => {
    fetchPatents(companyUrl, search, page)
    try {
      const { data } = await companyPatents(search, page)

      fetchPatentsComplete(data, companyUrl, search, page)
    } catch (e) {
      const { response } = e
      fetchPatentsError(response.statusText, companyUrl, search, page)
    }
  }
  const isNameCached = (search: string) => state.companySearches[search]
  const profileByCompany = (search: string) => state.companySearches[search] || { ids: [] }
  const getCompaniesById = (id: string) => state.entities.companies[id]
  const patentsByCompany = (companyUrl: string) => state.patentsByCompany[companyUrl] || { ids: [] }
  const getPatentById = (id: string) => state.entities.patents[id]
  const fetchCompanyIfNeeded = async (search: string, page = 1) => {
    const isCached = getCompaniesById(search)
    if (isCached) {
      return Promise.resolve()
    }
    return getCompaniesByName(search, page)
  }
  const getCompaniesByNameIfNeeded = async (search: string, page = 1) => {
    const isCached = isNameCached(search)
    if (isCached) {
      return Promise.resolve()
    }
    return getCompaniesByName(search, page)
  }

  return {
    state,
    getCompaniesByNameIfNeeded,
    getCompaniesByName,
    profileByCompany,
    getCompaniesById,
    fetchCompanyIfNeeded,
    getPatentsByCompany,
    patentsByCompany,
    getPatentById,
  }
}

export default useCompanies
