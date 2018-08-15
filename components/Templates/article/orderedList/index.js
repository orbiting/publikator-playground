import React, { Fragment } from 'react'
import { ifElse, compose, always } from 'ramda'
import { Editorial } from '@project-r/styleguide'

import {
  isBlock,
  safeProp
} from '@orbiting/publikator-editor/lib'

import { OrderedListUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('orderedList'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <OrderedListUI
          key="ui"
          node={node}
          editor={editor}
        />
        <Editorial.OL
          key="content"
          {...attributes}
        >
          {children}
        </Editorial.OL>
      </Fragment>
    ),
    always(undefined)
  )
}
