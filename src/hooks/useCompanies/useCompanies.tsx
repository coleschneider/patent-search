import React from 'react'
import * as _ from 'lodash'
import paginate from './paginate'
import { companySearch, companyPatents } from '../../utils/service'

import makeActions, {
  FETCH_COMPANIES,
  FETCH_COMPANIES_COMPLETE,
  FETCH_COMPANIES_ERROR,
  FETCH_PATENTS,
  FETCH_PATENTS_COMPLETE,
  FETCH_PATENTS_ERROR,
} from './actions'

const initialState: State = {
  companySearches: {},
  patentsByCompany: {},
  entities: { companies: {}, patents: {} },
}
// Reducers
const companyPaginationReducer = paginate({
  types: [FETCH_COMPANIES, FETCH_COMPANIES_COMPLETE, FETCH_COMPANIES_ERROR],
  mapActionToKey: (actionType: Actions) => actionType.meta.search,
})

const patentPaginationReducer = paginate({
  types: [FETCH_PATENTS, FETCH_PATENTS_COMPLETE, FETCH_PATENTS_ERROR],
  mapActionToKey: (actionType: Actions) => actionType.meta.companyUrl,
})

const entitiesReducer = (state: EntityState, action: Actions): EntityState => {
  if (action.hasOwnProperty('payload') && action.payload.entities) {
    return _.merge({}, state, action.payload.entities)
  }
  return state
}
// Root Reducer
const rootReducer = (state: State, action: Actions) => {
  return {
    companySearches: companyPaginationReducer(state.companySearches, action),
    patentsByCompany: patentPaginationReducer(state.patentsByCompany, action),
    entities: entitiesReducer(state.entities, action),
  }
}

function useCompanies() {
  const [state, dispatch] = React.useReducer(rootReducer, initialState)

  const {
    fetchCompanies,
    fetchCompaniesComplete,
    fetchCompaniesError,
    fetchPatents,
    fetchPatentsComplete,
    fetchPatentsError,
  } = makeActions(dispatch)

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
  const isNameCached = (search: string) => state.companySearches[search]
  const profileBySearch = (search: string) =>
    state.companySearches[search] || { ids: [], isFetching: false, count: 0, total: 0, error: null, page: 1 }
  const getCompaniesById = (id: string): Company => state.entities.companies[id]
  const patentsByCompany = (companyUrl: string) => state.patentsByCompany[companyUrl] || { ids: [] }
  const getPatentById = (id: string) => state.entities.patents[id]
  const profileByCompany = (search: string) => {
    const { ids, ...status } = profileBySearch(search)
    return {
      companies: ids.map(getCompaniesById) as Company[],
      ...status,
    }
  }
  return {
    state,
    profileBySearch,
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
