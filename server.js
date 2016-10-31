/* Babel polyfill to include regenerator runtime */
import 'babel-polyfill'

import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import { MemoryStore, Api } from 'graphql-query-whitelist'

import whitelistUI from './src'

/* Get Express instance and set port */
const app = express()
const port = process.env.PORT || 3001
const host = process.env.HOST || 'localhost'

const compiler = webpack(require('./webpack.config'))

app.use(bodyParser.json())
app.use('/whitelist/api', Api(new MemoryStore()))
app.use(whitelistUI({
  apiURL: '/whitelist/api/',
  graphqlURL: 'http://redo-graphql.staging.restorando.com/graphql?country=ar&region=buenos-aires'
}))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true
}))

/* Spawn server */
app.listen(port, () => process.send
  ? process.send('online')
  : console.log(`The server is accepting requests at http://${host}:${port}`))

export default app
