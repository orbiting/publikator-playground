import React, { Component } from 'react'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Editor from './components/Editor'

import reducers from './reducers'
import Frame from './components/Frame'

import PropertyFormContainer from './components/PropertyFormContainer'
import SelectionPath from './components/SelectionPath'
import { css } from 'glamor'

import { plugins } from './config'

css.global('html, body', { padding: 0, margin: 0 })
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

class Publikator extends Component {
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
            <Editor plugins={plugins} />
          </Frame>
        </div>
      </Provider>
    )
  }
}

export default Publikator
