import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Editor as SlateEditor } from 'slate-react'

import { withApp } from './apps/value'
import UI from './components/UI'

const Editor = withApp(SlateEditor)

class PublikatorEditor extends Component {
  render() {
    return (
      <Fragment>
        <UI />
        <Editor
          spellCheck={false}
          autoFocus={false}
          plugins={this.props.plugins}
          initialValue={this.props.initialValue}
        />
      </Fragment>
    )
  }
}

PublikatorEditor.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired,
}

export default PublikatorEditor
