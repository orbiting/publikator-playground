import React, { Fragment } from 'react'
import { FigureCover } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import { CoverUI } from './ui'

export default ifElse(
  compose(
    isBlock('cover'),
    safeProp('node')
  ),
  ({ node, attributes, children, editor }) => (
    <Fragment>
      <CoverUI
        key="ui"
        node={node}
        editor={editor}
      />
      <FigureCover
        key="content"
        {...attributes}
        size={
          node.data.get('size') === 'edgeToEdge'
            ? undefined
            : node.data.get('size')
        }
      >
        {children}
      </FigureCover>
    </Fragment>
  ),
  always(undefined)
)
