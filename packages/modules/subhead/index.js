import React, { Fragment } from 'react'
import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'

import {
  isBlock,
  safeProp
} from '@orbiting/publikator-editor/lib'

import { SubheadUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('subhead'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <SubheadUI
          key="ui"
          node={node}
          editor={editor}
        />
        <Editorial.Subhead
          key="content"
          {...attributes}
        >
          {children}
        </Editorial.Subhead>
      </Fragment>
    ),
    always(undefined)
  )
}
