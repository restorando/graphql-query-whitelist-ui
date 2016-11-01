import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/app'
import request from 'superagent'
import schema from '../schema'

ReactDOM.render(<App />, document.getElementById('app'))

request
  .get('queries')
  .end((err, res) => {
    if (err) return window.alert(err)

    ReactDOM.render(<App queries={res.body} schema={schema}/>, document.getElementById('app'))
  })
