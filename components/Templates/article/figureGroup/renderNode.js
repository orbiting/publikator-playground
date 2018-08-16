import React, { Fragment } from 'react'

import { FigureGroup } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock,
} from '@orbiting/publikator-editor/lib'

import { FigureGroupUI } from './ui'

export default ifElse(
  compose(
    isBlock('figureGroup'),
    safeProp('node')
  ),
  ({ children, attributes, node, editor }) => {
    return (
      <Fragment>
        <FigureGroupUI
          key="ui"
          node={node}
          editor={editor}
        />
        <FigureGroup
          key="content"
          size={node.data.get('size')}
          columns={node.data.get('columns')}
          {...attributes}
        >
          {children}
        </FigureGroup>
      </Fragment>
    )
  },
  always(undefined)
)
