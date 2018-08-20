import React, { Fragment } from 'react'
import { ifElse, compose, always } from 'ramda'
import { Editorial } from '@project-r/styleguide'

import {
  isBlock,
  safeProp
} from '@orbiting/publikator-editor/lib'

import { UnorderedListUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('unorderedList'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <UnorderedListUI
          key="ui"
          node={node}
          editor={editor}
        />
        <Editorial.UL
          key="content"
          {...attributes}
        >
          {children}
        </Editorial.UL>
      </Fragment>
    ),
    always(undefined)
  )
}
