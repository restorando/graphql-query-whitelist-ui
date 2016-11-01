import express from 'express'
import React from 'react'
import App from './components/app'
import { renderToString } from 'react-dom/server'
import path from 'path'
import { MemoryStore } from 'graphql-query-whitelisting'

const app = express()
const store = new MemoryStore()

store.put('query FirstnameQuery { firstName }')
store.put('query SurnameQuery { lastName }')
store.put('query FullQuery { firstName, lastName }')

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'assets')))

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const compiler = webpack({
    entry: [path.join(__dirname, 'client/index.js')],
    output: {
      path: '/',
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }]
    }
  })

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: '/assets'
  }))
}

app.get('/', (req, res) => {
  const reactOutput = renderToString(<App />)
  res.render('index', { reactOutput })
})

app.get('/queries', (req, res) => {
  const queries = store.entries()
  res.json(queries)
})

export default app
