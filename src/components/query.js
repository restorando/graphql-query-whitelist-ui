import React from 'React'

const FullQuery = ({ query }) => <pre className='full-query'> {query} </pre>

export default ({ id, query }) => (
  <div className='list-item'>
    <div className='query-info'>
      <div className='query-id'>{id}</div>
      <div className='delete' />
    </div>
    <FullQuery query={query}></FullQuery>
  </div>
)
