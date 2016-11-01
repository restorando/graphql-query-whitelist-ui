/* Babel polyfill to include regenerator runtime */
import 'babel-polyfill'

/* Import `express` app */
import whitelistUI from './app'
import express from 'express'

const app = express()
app.use('/', whitelistUI)

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3001

app.set('port', port)

/* Spawn server */
app.listen(app.get('port'), console.log(`The server is accepting requests at http://${host}:${app.get('port')}`))
