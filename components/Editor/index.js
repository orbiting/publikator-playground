import React, { Component } from 'react'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Editor as SlateEditor } from 'slate-react'

import withValue from './hoc/withValue'

import reducers from './reducers'
import Frame from './components/Frame'

import PropertyFormContainer from './components/PropertyFormContainer'
import SelectionPath from './components/SelectionPath'
import { css } from 'glamor'

css.global('html, body', { padding: 0, margin: 0 })

const Editor = withValue(SlateEditor)

const styles = {
  root: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif, Arial, Helvetica'
  }),
  doc: css({
    flex: '1 100%'
  })
}

class PublikatorEditor extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(
      combineReducers(reducers),
      props.state
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <div {...styles.root}>
          <SelectionPath />
          <PropertyFormContainer />
          <Frame {...styles.doc}>
            <Editor plugins={this.props.plugins} />
          </Frame>
        </div>
      </Provider>
    )
  }
}

export default PublikatorEditor
