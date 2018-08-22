import React, { Fragment } from 'react'
import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'
import { ifElse, compose, always } from 'ramda'

import {
  isBlock,
  safeProp,
} from '@orbiting/publikator-editor/lib'

import { ParagraphUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('paragraph'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <ParagraphUI
          key="ui"
          offset={1}
          node={node}
          editor={editor}
        />

        <SchemaComponent
          key="content"
          name="paragraph"
          {...attributes}
        >
          {children}
        </SchemaComponent>
      </Fragment>
    ),
    always(undefined)
  ),
}
