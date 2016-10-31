import request from './request'

const requestSchema = () => ({
  type: 'REQUEST_SCHEMA'
})

const receiveSchema = (schema) => ({
  type: 'RECEIVE_SCHEMA',
  schema
})

const requestSchemaError = (error) => ({
  type: 'REQUEST_SCHEMA_ERROR',
  error
})

export const fetchSchema = () => async dispatch => {
  dispatch(requestSchema())
  try {
    const schema = await request('schema')
    dispatch(receiveSchema(schema.data))
  } catch ({ error }) {
    dispatch(requestSchemaError(error))
  }
}
