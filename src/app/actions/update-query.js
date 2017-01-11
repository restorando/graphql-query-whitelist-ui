import request from './request'

const updateQueryAction = (queryId, queryProps) => ({
  type: 'UPDATE_QUERY',
  queryId,
  queryProps
})

const confirmUpdatedQuery = (query) => ({
  type: 'CONFIRM_UPDATED_QUERY',
  query
})

const updateQueryError = (queryId, error) => ({
  type: 'UPDATE_QUERY_ERROR',
  queryId,
  error
})

const updateQuery = (queryId, props) => async (dispatch, getState) => {
  const { config: { apiURL } } = getState()
  const url = `${apiURL}queries/${queryId}`

  dispatch(updateQueryAction(queryId, props))

  try {
    const query = await request(url, {
      method: 'PUT',
      body: JSON.stringify(props)
    })
    dispatch(confirmUpdatedQuery(query))
  } catch ({ error }) {
    dispatch(updateQueryError(queryId, error))
  }
}

export const enableQuery = (queryId) => updateQuery(queryId, { enabled: true })
export const disableQuery = (queryId) => updateQuery(queryId, { enabled: false })
export const renameQuery = (queryId, operationName) => updateQuery(queryId, { operationName })
