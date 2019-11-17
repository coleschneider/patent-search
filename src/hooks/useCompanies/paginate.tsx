import * as _ from 'lodash'

interface PaginateParams {
  types: CompanyActionTypesUnion[] | PatentActionTypesUnion[]
  mapActionToKey: (action: Actions) => string | number
}

const paginate = ({ types, mapActionToKey }: PaginateParams) => {
  const [requestType, successType, failureType] = types
  const updatePagination = (
    state = {
      ids: [],
      isFetching: true,
      error: null,
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
          error: action.error,
          isFetching: false,
        }
      default:
        return state
    }
  }
  return (state: PaginateEntity, action: Actions) => {
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

export default paginate
