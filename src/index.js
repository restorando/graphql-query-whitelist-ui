import express from 'express'
import fetch from 'isomorphic-fetch'
import path from 'path'
import { introspectionQuery as query, graphql } from 'graphql'

/* eslint-disable no-console */

export default (options = {}) => {
  const { apiURL, graphqlURL, graphqlSchema } = options

  if (graphqlURL && graphqlSchema) {
    throw new Error("You can't specify a GraphQL schema and a GraphQL endpoint simultaneously")
  }

  const app = express()

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))

  app.use(express.static(path.join(__dirname, 'static')))

  app.get('/schema', async (req, res, next) => {
    if (graphqlSchema) {
      const result = await graphql(graphqlSchema, query)
      if (result.errors) console.error(result.errors)

      return res.send(result)
    }

    try {
      const response = await fetch(graphqlURL, {
        body: JSON.stringify({ query }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const body = await response.text()

      res.status(response.status).send(body)
    } catch (error) {
      next(error, req, res)
    }
  })

  app.get('/', (req, res) => {
    res.render('index', { apiURL: apiURL || '' })
  })

  // Error handling
  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message })
  })

  return app
}
