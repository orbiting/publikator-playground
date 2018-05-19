import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import { fontFamilies } from '@project-r/styleguide'
import {
  createStore,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import {
  Editor as SlateEditor,
  findDOMRange
} from 'slate-react'

import withValue from './hoc/withValue'
import reducers from './reducers'
import Frame from './components/Frame'
import SelectionPath from './components/SelectionPath'

const Editor = withValue(SlateEditor)

import 'glamor/reset'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', {
  boxSizing: 'inherit'
})

css.global('body', {
  fontFamily: fontFamilies.sansSerifRegular
})

const styles = {
  root: css({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif, Arial, Helvetica',
    overflow: 'hidden'
  }),
  ui: css({
    position: 'fixed',
    width: 0
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
          <div {...styles.ui}>
            <SelectionPath.Menu />
            <SelectionPath.Container />
          </div>
          <Frame {...styles.doc}>
            <Editor
              plugins={this.props.plugins}
            />
          </Frame>
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
