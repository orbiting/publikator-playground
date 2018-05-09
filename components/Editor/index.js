import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  createStore,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import { Editor as SlateEditor } from 'slate-react'

import withValue from './hoc/withValue'

import reducers from './reducers'

import PropertyFormContainer from './components/PropertyFormContainer'
import SelectionPath from './components/SelectionPath'
import { css } from 'glamor'

const Editor = withValue(SlateEditor)

const styles = {
  root: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif, Arial, Helvetica',
    overflow: 'hidden'
  }),
  doc: css({
    overflow: 'scroll'
  })
}

class PublikatorEditor extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(
      combineReducers(reducers),
      props.value && { value: props.value }
    )

    this.changeHandler = () =>
      this.props.onChange &&
      this.props.onChange(
        this.store.getState().value
      )

    this.unsubscribe = this.store.subscribe(
      this.changeHandler
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <div {...styles.root}>
          <SelectionPath />
          <PropertyFormContainer />
          <div {...styles.doc}>
            <Editor
              plugins={this.props.plugins}
            />
          </div>
        </div>
      </Provider>
    )
  }
}

PublikatorEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
  plugins: PropTypes.array
}

export default PublikatorEditor
