import React from 'react'

export const { FETCH_COMPANIES, FETCH_COMPANIES_COMPLETE, FETCH_COMPANIES_ERROR }: CompanyActionTypes = {
  FETCH_COMPANIES: 'FETCH_COMPANIES',
  FETCH_COMPANIES_COMPLETE: 'FETCH_COMPANIES_COMPLETE',
  FETCH_COMPANIES_ERROR: 'FETCH_COMPANIES_ERROR',
}
export const { FETCH_PATENTS, FETCH_PATENTS_COMPLETE, FETCH_PATENTS_ERROR }: PatentActionTypes = {
  FETCH_PATENTS: 'FETCH_PATENTS',
  FETCH_PATENTS_COMPLETE: 'FETCH_PATENTS_COMPLETE',
  FETCH_PATENTS_ERROR: 'FETCH_PATENTS_ERROR',
}

function generateActions(dispatch: React.Dispatch<any>) {
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

  return {
    fetchCompanies,
    fetchCompaniesComplete,
    fetchCompaniesError,
    fetchPatents,
    fetchPatentsComplete,
    fetchPatentsError,
  }
}

export default generateActions
