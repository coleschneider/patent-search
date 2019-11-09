import React from 'react'
import { companySearch, companyPatents } from '../../utils/service'

const initialState: State = {
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
      companies: companiesReducer(state.companies, action),
      charters: chartersReducer(state.charters, action),
    }
  }
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const fetchCompanies = (page: number) =>
    dispatch({
      type: 'FETCH_COMPANIES',
      payload: { page },
    })

  const fetchCompaniesComplete = (response: CompanySearchResponse) =>
    dispatch({
      type: 'FETCH_COMPANIES_COMPLETE',
      payload: response,
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

  const getCompaniesByName = async (name: string, page = 1) => {
    fetchCompanies(page)
    try {
      const { data } = await companySearch(name, page)
      fetchCompaniesComplete(data)
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
