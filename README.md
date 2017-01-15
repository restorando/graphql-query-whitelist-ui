# graphql-query-whitelist-ui

A slick UI for viewing, adding and enabling/disabling queries for [graphql-query-whitelist](https://github.com/restorando/graphql-query-whitelist).

This UI uses the API that comes with [graphql-query-whitelist](https://github.com/restorando/graphql-query-whitelist)

![whitelist-ui](https://cloud.githubusercontent.com/assets/591992/21966398/248f9b3c-db51-11e6-9c37-12e2a3a9a9de.gif)

# Installation

`npm install --save graphql-query-whitelist-ui`

Example app:

```js
import express from 'express'
import bodyParser from 'body-parser'
import { MemoryStore, Api } from 'graphql-query-whitelist'
import whitelistUI from 'graphql-query-whitelist-ui'

/* Get Express instance and set port */
const app = express()

app.use(bodyParser.json())

// The whitelist UI will be available at `http://localhost/whitelist`
app.get('/whitelist', whitelistUI({ apiURL: '/whitelist/api/' }))

// The `graphql-query-whitelist` API can be mounted into a different app.
// We mount it in this same app just to contextualize this example
app.use('/whitelist/api', Api(new MemoryStore()))
```

## Features

 - Addition of whitelisted queries
 - Queries can be enabled/disabled and renamed
 - Query Autocompletion using an internal o external schema
 - Query linting using an internal or external schema

## Options

#### apiURL (required)

This option tells the UI where the `graphql-query-whitelist` API is mounted. The URL must contain a trailing slash .

#### graphqlURL

If this option is set, the query autocompletion and linting will be enabled using the provided schema.

**Example:**

```js
app.get('/whitelist', whitelistUI({
  apiURL: '/whitelist/api/',
  graphqlURL: 'https://graphql-swapi.parseapp.com'
}))
```

#### graphqlSchema

Alternatively, if the UI is mounted in the same app as the GraphQL endpoint, you can pass the schema directly.

**Example:**

```js
// This returns an instance of GraphQLSchema
import schema from './schema'

app.get('/whitelist', whitelistUI({
  apiURL: '/whitelist/api/',
  graphqlSchema: schema
}))
```

## Todo

- [ ] Query search box
- [ ] Pagination

## License

Copyright (c) 2017 Restorando

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
