import React, { Fragment } from 'react'
import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'
import { compose, ifElse, always } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import { CreditsUI } from './ui'

export default compose(
  ifElse(
    compose(
      isBlock('title'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <Editorial.Headline
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Headline>
    )
  ),
  ifElse(
    compose(
      isBlock('lead'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <Editorial.Lead
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Lead>
    )
  ),
  ifElse(
    compose(
      isBlock('credits'),
      safeProp('node')
    ),
    ({ children, attributes, editor, node }) => (
      <Fragment>
        <CreditsUI
          key="ui"
          node={node}
          editor={editor}
        />
        <Editorial.Credit
          key="content"
          style={{ position: 'relative' }}
          {...attributes}
        >
          {children}
        </Editorial.Credit>
      </Fragment>
    )
  ),
  ifElse(
    compose(
      isBlock('titleBlock'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <TitleBlock {...attributes}>
        {children}
      </TitleBlock>
    )
  )
)(always(undefined))
