import React, { Component, PropTypes } from 'react'
import Toggle from 'react-toggle'
import classNames from 'classnames'
import { RIEInput } from 'riek'

export default class Query extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    operationName: PropTypes.string.isRequired,
    onToggleQueryStatusClick: PropTypes.func.isRequired,
    onQueryRename: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { id, query, operationName, enabled } = this.props
    const { expanded } = this.state

    return (
      <div className={classNames('list-item', { 'fixed-height': !expanded })}>
        <div className='query-info'>
          <RIEInput
            className='query-title'
            value={operationName}
            change={this.onQueryRename}
            validate={(val) => val}
            propName="operationName" />
          <div className='query-id'>{id}</div>
          <div className='delete'>
            <Toggle checked={enabled} value="yes" onChange={this.onToggleStatus} />
          </div>
        </div>
        <pre className='full-query' onClick={this.expandQuery}>{query}</pre>
      </div>
    )
  }

  expandQuery = () => {
    this.setState({ expanded: true })
  }

  onQueryRename = ({ operationName }) => {
    const { onQueryRename, id } = this.props
    onQueryRename(id, operationName)
  }

  onToggleStatus = () => {
    const { onToggleQueryStatusClick, operationName, id, enabled } = this.props
    const operation = enabled ? 'disable' : 'enable'

    if (window.confirm(`Are you sure to ${operation} query '${operationName}'?`)) {
      onToggleQueryStatusClick(id, operation)
    }
  }
}
