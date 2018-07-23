import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import { fontFamilies } from '@project-r/styleguide'

import { Editor as SlateEditor } from 'slate-react'
import withValue from './hoc/withValue'
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
    overflow: 'scroll'
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
  render() {
    return (
      <div {...styles.root}>
        <div {...styles.doc}>
          <Editor
            plugins={this.props.plugins}
            initialValue={this.props.initialValue}
          />
        </div>
        <div {...styles.ui}>
          <SelectionPath.Menu />
          <SelectionPath.Container />
        </div>
      </div>
    )
  }
}

PublikatorEditor.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired
}

export default PublikatorEditor
