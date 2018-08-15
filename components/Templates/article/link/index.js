import React, { Fragment } from 'react'
import { Editorial } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline
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
        <Editorial.A
          key="content"
          href={node.data.get('url')}
          title={node.data.get('title')}
          {...attributes}
        >
          {children}
        </Editorial.A>
      </Fragment>
    ),
    always(undefined)
  )
}
