import React, { Fragment } from 'react'
import { Figure } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'
import { css } from 'glamor'

import {
  safeProp,
  isBlock,
} from '@orbiting/publikator-editor/lib'

const styles = {
  edgeToEdge: css({
    width: '100vw',
    marginLeft: '-15px',
    [`@media only screen and (min-width: 665px)`]: {
      marginLeft: `calc(-100vw / 2 + 665px / 2)`,
      marginRight: `calc(-100vw / 2 + 665px / 2)`,
    },
  }),
}

import { FigureUI } from './ui'

export default ifElse(
  compose(
    isBlock('figure'),
    safeProp('node')
  ),
  ({ node, attributes, children, editor }) => (
    <Fragment>
      <FigureUI
        key="ui"
        node={node}
        editor={editor}
      />
      node.data.get('size') === 'edgeToEdge' ? (
      <div
        key="content-edgeToEdge"
        {...styles.edgeToEdge}
      >
        <Figure {...attributes}>
          {children}
        </Figure>
      </div>
      ) : (
      <Figure
        key="content"
        {...attributes}
        size={node.data.get('size')}
      >
        {children}
      </Figure>
      )
    </Fragment>
  ),
  always(undefined)
)
