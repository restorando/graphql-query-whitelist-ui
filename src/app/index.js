import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import App from './components/app'
import { queryEditor } from './reducers'
import { config } from './actions'

const isDev = process.env.NODE_ENV === 'development'

let middlewares = [thunkMiddleware]

if (isDev) {
  middlewares = [...middlewares, require('redux-logger')()]
}

const store = createStore(queryEditor, applyMiddleware(...middlewares))
store.dispatch(config({ ...window.config }))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
