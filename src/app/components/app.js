import React, { Component, PropTypes } from 'react'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux'

import Header from './header'
import NewQuery from './new-query'
import Query from './query'

import { fetchQueries, fetchSchema, enableQuery, disableQuery, renameQuery } from '../actions/'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    schema: PropTypes.object,
    fetchingQueries: PropTypes.bool,
    queries: PropTypes.arrayOf(PropTypes.object)
  }

  componentDidMount() {
    this.props.dispatch(fetchQueries())
    this.props.dispatch(fetchSchema())
  }

  render() {
    const { schema, queries, fetchingQueries } = this.props

    return (
      <div className='wrapper'>
        <Header />
        <NewQuery schema={schema} />

        {
          !fetchingQueries && queries.map((queryProps) => (
            <Query
              key={queryProps.id}
              onToggleQueryStatusClick={this.onToggleQueryStatusClick}
              onQueryRename={this.onQueryRename}
              {...queryProps} />
          ))
        }

        { fetchingQueries && <Spinner spinnerName='three-bounce' noFadeIn className='center' /> }

      </div>
    )
  }

  onToggleQueryStatusClick = (id, status) => {
    const action = status === 'enable' ? enableQuery : disableQuery
    this.props.dispatch(action(id))
  }

  onQueryRename = (id, operationName) => {
    this.props.dispatch(renameQuery(id, operationName))
  }
}

const mapStateToProps = ({ queries, fetchingQueries, schema }) => ({ queries, fetchingQueries, schema })

export default connect(mapStateToProps)(App)
