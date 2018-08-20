import React, { Fragment } from 'react'
import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'

import {
  isBlock,
  safeProp
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

        <Editorial.P
          key="content"
          {...attributes}
        >
          {children}
        </Editorial.P>
      </Fragment>
    ),
    always(undefined)
  )
}
