import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'
import {
  compose,
  ifElse,
  always,
  both
} from 'ramda'

import {
  safeProp,
  isBlock,
  hasEmptyText
} from '../../../Editor/utils/foo'

import Placeholder from '../../../Editor/components/Placeholder'

export const renderNode = compose(
  ifElse(
    compose(isBlock('title'), safeProp('node')),
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
    compose(isBlock('lead'), safeProp('node')),
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
    compose(isBlock('credits'), safeProp('node')),
    ({ children, attributes }) => (
      <Editorial.Credit
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Credit>
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

export const renderPlaceholder = compose(
  ifElse(
    compose(
      both(isBlock('title'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Titel</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('lead'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Lead</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('credits'), hasEmptyText),
      safeProp('node')
    ),
    () => (
      <Placeholder>Autoren, Datum</Placeholder>
    )
  )
)(always(undefined))
