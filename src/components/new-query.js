import React, { Component, PropTypes } from 'React'
import QueryEditor from './query-editor'
import classNames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as QueryActions from '../client/actions'

class NewQuery extends Component {
  static propTypes = {
    toggleQueryForm: PropTypes.func.isRequired,
    cleanCurrentQuery: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.onAddQueryClick = this.onAddQueryClick.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  render() {
    return (
      <div className='new-query'>
        <button onClick={this.props.toggleQueryForm} className={classNames({ hidden: this.props.visible })}>add query</button>

        <div className={classNames({ 'codemirror-hidden': !this.props.visible })}>
          <QueryEditor schema={this.props.schema} onEdit={this.props.setCurrentQuery } value={this.props.currentQuery} />

          <div className='query-buttons'>
            <button onClick={this.onCancelClick}>Cancel</button>
            <button onClick={this.onAddQueryClick}>Save</button>
          </div>
        </div>
      </div>
    )
  }

  onCancelClick() {
    this.props.cleanCurrentQuery()
    this.props.toggleQueryForm()
  }

  onAddQueryClick() {
    console.log(this.props.currentQuery)
  }

}

const mapDispatchToProps = (dispatch) => bindActionCreators(QueryActions, dispatch)
const mapStateToProps = (state) => state

export default connect(mapStateToProps, mapDispatchToProps)(NewQuery)
