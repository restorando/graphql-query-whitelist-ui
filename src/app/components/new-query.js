import React, { Component, PropTypes } from 'react'
import QueryEditor from './query-editor'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { GraphQLSchema } from 'graphql'
import { toggleQueryForm, cleanCurrentQuery, setCurrentQuery, postQuery } from '../actions/'

class NewQuery extends Component {
  static propTypes = {
    toggleQueryForm: PropTypes.func.isRequired,
    cleanCurrentQuery: PropTypes.func.isRequired,
    setCurrentQuery: PropTypes.func.isRequired,
    postQuery: PropTypes.func.isRequired,
    formVisible: PropTypes.bool,
    schema: PropTypes.instanceOf(GraphQLSchema),
    currentQuery: PropTypes.string,
    newQueryErrorMessage: PropTypes.string,
    savingQuery: PropTypes.bool
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newQueryErrorMessage) {
      alert(nextProps.newQueryErrorMessage)
    }
  }

  render() {
    const { toggleQueryForm, formVisible, schema, setCurrentQuery, currentQuery, savingQuery } = this.props

    return (
      <div className='new-query'>
        <button onClick={toggleQueryForm} className={classNames({ hidden: formVisible })}>add query</button>

        <div className={classNames({ 'codemirror-hidden': !formVisible })}>
          <QueryEditor schema={schema} onEdit={setCurrentQuery} value={currentQuery} />

          <div className='query-buttons'>
            <button onClick={this.onCancelClick}>Cancel</button>
            <button onClick={this.onAddQueryClick} disabled={savingQuery}>Save</button>
          </div>
        </div>
      </div>
    )
  }

  onCancelClick = () => {
    this.props.cleanCurrentQuery()
    this.props.toggleQueryForm()
  }

  onAddQueryClick = () => {
    this.props.postQuery(this.props.currentQuery)
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleQueryForm, cleanCurrentQuery, setCurrentQuery, postQuery
}, dispatch)

const mapStateToProps = ({ formVisible, currentQuery, schema, newQueryErrorMessage, savingQuery }) =>
  ({ formVisible, currentQuery, schema, newQueryErrorMessage, savingQuery })

export default connect(mapStateToProps, mapDispatchToProps)(NewQuery)
