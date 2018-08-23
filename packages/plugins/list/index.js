import React, { Fragment } from 'react'
import { ifElse, compose, always } from 'ramda'
import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'

import {
  isBlock,
  safeProp,
} from '@orbiting/publikator-editor/lib'

import { ListUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('list'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <ListUI
          key="ui"
          node={node}
          editor={editor}
        />
        <SchemaComponent
          name="list"
          key="content"
          data={node.data.toJS()}
          {...attributes}
        >
          {children}
        </SchemaComponent>
      </Fragment>
    ),
    always(undefined)
  ),
}
