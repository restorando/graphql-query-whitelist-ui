import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import App from '../components/app'
import { queryEditor } from './reducers'
import schema from '../schema'
import createLogger from 'redux-logger'

const logger = createLogger()
const store = createStore(queryEditor, applyMiddleware(logger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
