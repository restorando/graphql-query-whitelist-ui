import request from './request'

const addQuery = (query) => ({
  type: 'ADD_QUERY',
  query
})

const receiveNewQuery = (query) => ({
  type: 'RECEIVE_NEW_QUERY',
  query
})

const addQueryError = (query, error) => ({
  type: 'ADD_QUERY_ERROR',
  query,
  error
})

export const postQuery = query => async (dispatch, getState) => {
  dispatch(addQuery(query))
  const { config: { apiURL } } = getState()
  const url = `${apiURL}queries`

  try {
    const newQuery = await request(url, {
      method: 'POST',
      body: JSON.stringify({ query })
    })

    dispatch(receiveNewQuery(newQuery))
  } catch ({ error }) {
    dispatch(addQueryError(query, error))
  }
}
