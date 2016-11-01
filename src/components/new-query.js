import React, { Component } from 'React'
import QueryEditor from './query-editor'
import classNames from 'classnames'

class NewQuery extends Component {
  constructor(props) {
    super(props)
    this.onAddQuery = this.onAddQuery.bind(this)
    this.onSave = this.onSave.bind(this)
    this.hide = this.hide.bind(this)
    this.state = { inputMode: false }
  }

  render() {
    return (
      <div className='new-query'>
        <button onClick={this.onAddQuery} className={classNames({ hidden: this.state.inputMode })}>add query</button>

        <div className={classNames({ 'codemirror-hidden': !this.state.inputMode })}>
          <QueryEditor schema={this.props.schema} />

          <div className='query-buttons'>
            <button onClick={this.hide}>Cancel</button>
            <button onClick={this.onSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }

  onAddQuery() {
    this.setState({ inputMode: true })
  }

  onSave() {
    this.hide()
  }

  hide() {
    this.setState({ inputMode: false })
  }
}

export default NewQuery
