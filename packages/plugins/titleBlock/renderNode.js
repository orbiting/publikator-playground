import React, { Fragment } from 'react'
import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'
import { compose, ifElse, always } from 'ramda'

import {
  safeProp,
  isBlock,
} from '@orbiting/publikator-editor/lib'

import { CreditsUI } from './ui'

export default compose(
  ifElse(
    compose(
      isBlock('title'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <SchemaComponent
        name="title"
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </SchemaComponent>
    )
  ),
  ifElse(
    compose(
      isBlock('subject'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <SchemaComponent
        name="subject"
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </SchemaComponent>
    )
  ),
  ifElse(
    compose(
      isBlock('lead'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <SchemaComponent
        name="lead"
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </SchemaComponent>
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
        <SchemaComponent
          name="credits"
          key="content"
          style={{ position: 'relative' }}
          {...attributes}
        >
          {children}
        </SchemaComponent>
      </Fragment>
    )
  ),
  ifElse(
    compose(
      isBlock('titleBlock'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <SchemaComponent
        name="titleBlock"
        {...attributes}
      >
        {children}
      </SchemaComponent>
    )
  )
)(always(undefined))
