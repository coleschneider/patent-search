import React from 'react'
import { companySearch, companyPatents } from '../../utils/service'

interface Paginate {
  types: ['FETCH_COMPANIES', 'FETCH_COMPANIES_COMPLETE', 'FETCH_COMPANIES_ERROR']
  mapActionToKey: (action: Actions) => string | number
}
const paginate = ({ types, mapActionToKey }: Paginate) => {
  const [requestType, successType, failureType] = types
  const updatePagination = (
    state = {
      assignees: null,
      isFetching: true,
      errors: null,
      page: 1,
      count: 0,
      total_assignee_count: 0,
    },
    action: Actions,
  ) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true,
        }
      case successType:
        console.log(successType, action)
        return {
          ...state,
          ...action.payload,
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
const createSearch = (search: string, page: number) => ({
  [search]: {
    [page]: {
      assignees: null,
      isFetching: true,
      errors: null,
      page: 1,
      count: 0,
      total_assignee_count: 0,
    },
  },
})

const initialState: State = {
  companySearches: {},
  companies: {
    assignees: null,
    isFetching: false,
    errors: null,
    page: 1,
    count: 0,
    total_assignee_count: 0,
  },
  charters: {
    patents: null,
    isFetching: false,
    errors: null,
    page: 1,
    count: 0,
    total_patent_count: 0,
  },
}
function useCompanies() {
  const companiesReducer = (state: CompanyState, action: Actions) => {
    switch (action.type) {
      case 'FETCH_COMPANIES':
        return {
          ...state,
          isFetching: true,
        }
      case 'FETCH_COMPANIES_COMPLETE':
        return {
          ...state,
          ...action.payload,
          isFetching: false,
        }
      case 'FETCH_COMPANIES_ERROR':
        return {
          ...state,
          errors: action.errors,
          isFetching: false,
        }
      default:
        return state
    }
  }
  const companySearchReducer = (state: CompanyState, action: Actions) => {
    switch (action.type) {
      case 'FETCH_COMPANIES':
        const { page, search } = action.meta
        return {
          ...state,
          ...createSearch(search, page),
        }
      case 'FETCH_COMPANIES_COMPLETE':
        return {
          ...state,
          [action.meta.search]: {
            [action.meta.page]: companiesReducer(state[action.meta.search][action.meta.page], action),
          },
        }
      default:
        return state
    }
  }
  const chartersReducer = (state: ChartersState, action: Actions) => {
    switch (action.type) {
      case 'FETCH_CHARTERS':
        return {
          ...state,
          page: action.payload.page,
          isFetching: true,
        }
      case 'FETCH_CHARTERS_COMPLETE':
        return {
          page: action.payload.page,
          patents: action.payload.patents,
          errors: null,
          count: action.payload.count,
          total_patent_count: action.payload.total_patent_count,
          isFetching: false,
        }
      case 'FETCH_COMPANIES_ERROR':
        return {
          ...state,
          errors: action.errors,
          isFetching: false,
        }
      default:
        return state
    }
  }
  const rootReducer = (state: State, action: Actions) => {
    return {
      // companySearches: companySearchReducer(state.companySearches, action),
      companySearches: paginate({
        types: ['FETCH_COMPANIES', 'FETCH_COMPANIES_COMPLETE', 'FETCH_COMPANIES_ERROR'],
        mapActionToKey: action => action.meta.search,
      })(state.companySearches, action),
      companies: companiesReducer(state.companies, action),
      charters: chartersReducer(state.charters, action),
    }
  }
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const fetchCompanies = (search: string, page: number) =>
    dispatch({
      type: 'FETCH_COMPANIES',
      meta: { page, search },
    })

  const fetchCompaniesComplete = (response: CompanySearchResponse, search: string, page: number) =>
    dispatch({
      type: 'FETCH_COMPANIES_COMPLETE',
      payload: response,
      meta: {
        search,
        page,
      },
    })
  const fetchCompaniesError = (errors: any) =>
    dispatch({
      type: 'FETCH_COMPANIES_ERROR',
      errors,
    })
  const fetchCharters = (page: number) =>
    dispatch({
      type: 'FETCH_CHARTERS',
      payload: { page },
    })

  const fetchChartersComplete = (response: ChartersSearchResponse) =>
    dispatch({
      type: 'FETCH_CHARTERS_COMPLETE',
      payload: response,
    })
  const fetchChartersError = (errors: any) =>
    dispatch({
      type: 'FETCH_COMPANIES_ERROR',
      errors,
    })

  const getCompaniesByName = async (search: string, page = 1) => {
    fetchCompanies(search, page)
    try {
      const { data } = await companySearch(search, page)
      fetchCompaniesComplete(data, search, page)
    } catch (e) {
      fetchCompaniesError(e)
    }
  }

  const getChartersByCompany = async (name: string, page = 1) => {
    fetchCharters(page)
    try {
      const { data } = await companyPatents(name, page)
      fetchChartersComplete(data)
    } catch (e) {
      fetchChartersError(e)
    }
  }

  return {
    state,
    getCompaniesByName,
    getChartersByCompany,
  }
}

export default useCompanies
