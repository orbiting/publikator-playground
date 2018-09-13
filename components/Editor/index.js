import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Editor as SlateEditor } from 'slate-react'

import { withEditor } from './apps/value'
import { SchemaProvider } from './components/Schema'

const Editor = withEditor(SlateEditor)

class PublikatorEditor extends Component {
  render() {
    return (
      <SchemaProvider schema={this.props.schema}>
        <Fragment>
          <Editor
            spellCheck={false}
            autoFocus={false}
            plugins={this.props.plugins}
            initialValue={this.props.initialValue}
          />
        </Fragment>
      </SchemaProvider>
    )
  }
}

PublikatorEditor.propTypes = {
  onChange: PropTypes.func,
  initialValue: PropTypes.object.isRequired,
  plugins: PropTypes.array.isRequired,
  schema: PropTypes.object.isRequired,
}

export default PublikatorEditor
