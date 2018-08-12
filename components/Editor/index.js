import { compose } from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import { fontFamilies } from '@project-r/styleguide'

import { Editor as SlateEditor } from 'slate-react'
import { withApp } from './apps/value'
import {
  withEditMode,
  DEFAULT_NAMESPACE
} from './apps/editMode'
import SelectionPath from './components/SelectionPath'

const Editor = compose(
  withApp,
  withEditMode({ namespace: DEFAULT_NAMESPACE })
)(({ focusRef, ...props }) => (
  <SlateEditor {...props} ref={focusRef} />
))

import 'glamor/reset'

css.global('html', { boxSizing: 'border-box' })
css.global('*, *:before, *:after', {
  boxSizing: 'inherit'
})

css.global('body', {
  fontFamily: fontFamilies.sansSerifRegular
})

const styles = {
  ui: css({
    position: 'fixed',
    width: 0,
    zIndex: 9999
  })
}

class PublikatorEditor extends Component {
  render() {
    return (
      <div>
        <div {...styles.ui}>
          <SelectionPath.Menu />
          <SelectionPath.Container />
        </div>
        <Editor
          spellCheck={false}
          autoFocus={false}
          plugins={this.props.plugins}
          initialValue={this.props.initialValue}
        />
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
