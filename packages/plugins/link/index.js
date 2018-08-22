import React, { Fragment } from 'react'
import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline,
} from '@orbiting/publikator-editor/lib'

import { LinkUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isInline('link'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <LinkUI
          key="ui"
          node={node}
          editor={editor}
        />
        <SchemaComponent
          key="content"
          name="link"
          href={node.data.get('url')}
          title={node.data.get('title')}
          {...attributes}
        >
          {children}
        </SchemaComponent>
      </Fragment>
    ),
    always(undefined)
  ),
}
