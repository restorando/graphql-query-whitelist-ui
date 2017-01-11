import { buildClientSchema } from 'graphql'

const defaultState = {
  formVisible: false,
  currentQuery: '',
  queries: [],
  config: {}
}

const replaceQuery = (queries, query) => {
  const index = queries.findIndex((q) => q.id === query.id)
  queries = Array.from(queries)
  queries.splice(index, 1, query)
  return queries
}

export function queryEditor(state = defaultState, action) {
  switch (action.type) {
    case 'CONFIG':
      return { ...state, config: action.config }
    case 'TOGGLE_QUERY_FORM':
      return { ...state, formVisible: !state.formVisible }
    case 'SET_CURRENT_QUERY':
      return { ...state, currentQuery: action.currentQuery, newQueryErrorMessage: null }
    case 'CLEAN_CURRENT_QUERY':
      return { ...state, currentQuery: '' }
    case 'REQUEST_QUERIES':
      return { ...state, fetchingQueries: true }
    case 'RECEIVE_QUERIES':
      return { ...state, fetchingQueries: false, queries: action.queries }
    case 'ADD_QUERY': {
      const newQuery = {
        query: state.currentQuery,
        enabled: true,
        operationName: 'Saving query...',
        id: 'newQuery'
      }

      return {
        ...state,
        newQueryErrorMessage: null,
        queriesBackup: [...state.queries],
        queries: [newQuery, ...state.queries],
        savingQuery: true
      }
    }
    case 'RECEIVE_NEW_QUERY':
      return {
        ...state,
        queries: [action.query, ...state.queries.slice(1)],
        formVisible: false,
        savingQuery: false,
        currentQuery: ''
      }
    case 'ADD_QUERY_ERROR':
      return {
        ...state,
        newQueryErrorMessage: action.error,
        queries: state.queriesBackup,
        savingQuery: false
      }
    case 'UPDATE_QUERY': {
      const query = state.queries.find((q) => q.id === action.queryId )
      const lastUpdatedQuery = { ...query }
      const updatedQuery = { ...query, ...action.queryProps }
      return { ...state, lastUpdatedQuery, queries: replaceQuery(state.queries, updatedQuery) }
    }
    case 'CONFIRM_UPDATED_QUERY': {
      return { ...state, queries: replaceQuery(state.queries, action.query) }
    }
    case 'UPDATE_QUERY_ERROR':
      return {
        ...state,
        queries: replaceQuery(state.queries, state.lastUpdatedQuery),
        lastUpdatedQuery: null
      }
    case 'RECEIVE_SCHEMA': {
      return { ...state, schema: buildClientSchema(action.schema) }
    }
    default:
      return state
  }
}
