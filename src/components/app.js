import React from 'react'
import Header from './header'
import NewQuery from './new-query'
import Query from './query'

export default ({ queries = [] }) => (
  <div className='wrapper'>
    <Header />
    <NewQuery />

    {
      queries.map(({ id, query }) => (
        <Query id={id} query={query} key={id}/>
      ))
    }

  </div>
)
