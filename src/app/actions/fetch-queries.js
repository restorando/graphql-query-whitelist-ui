import request from './request'

const requestQueries = () => ({
  type: 'REQUEST_QUERIES'
})

const receiveQueries = (queries) => ({
  type: 'RECEIVE_QUERIES',
  queries
})

const requestQueriesError = (error) => ({
  type: 'REQUEST_QUERIES_ERROR',
  requestQueriesError: error
})

export const fetchQueries = () => async (dispatch, getState) => {
  dispatch(requestQueries())
  const { config: { apiURL } } = getState()
  const url = `${apiURL}queries`

  try {
    const queries = await request(url)
    dispatch(receiveQueries(queries))
  } catch ({ error }) {
    dispatch(requestQueriesError(error))
  }
}
