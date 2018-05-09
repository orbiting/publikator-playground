import {
  FigureCaption,
  FigureByline
} from '@project-r/styleguide'

import {
  compose,
  always,
  ifElse,
  both
} from 'ramda'

import {
  safeProp,
  hasEmptyText,
  isBlock
} from '../../../Editor/utils/foo'

import { InlinePlaceholder } from '../../../Editor/components/Placeholder'
import PropertyForm from '../../../Editor/components/PropertyForm'

import { TextButtons } from '../common/ui'
import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'

export const renderNode = compose(
  ifElse(
    compose(isBlock('caption'), safeProp('node')),
    ({ children, attributes }) => [
      <FigureCaption
        key="content"
        {...attributes}
      >
        {children}
      </FigureCaption>
    ]
  ),
  ifElse(
    compose(
      isBlock('captionText'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        key="ui"
        node={node}
        offset={1}
      >
        <BoldButton editor={editor} />
        <LinkButton editor={editor} />
        <TextButtons
          editor={editor}
          node={node}
        />
      </PropertyForm>,
      <span key="content" {...attributes}>
        {children}
      </span>
    ]
  ),
  ifElse(
    compose(
      isBlock('captionByline'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        key="ui"
        node={node}
        offset={1}
      >
        <LinkButton editor={editor} />
        <TextButtons
          editor={editor}
          node={node}
        />
      </PropertyForm>,
      <FigureByline key="content" {...attributes}>
        {children}
      </FigureByline>
    ]
  )
)(always(undefined))

export const renderPlaceholder = compose(
  ifElse(
    compose(
      both(isBlock('captionText'), hasEmptyText),
      safeProp('node')
    ),
    () => (
      <InlinePlaceholder>
        Legende
      </InlinePlaceholder>
    )
  ),
  ifElse(
    compose(
      both(
        isBlock('captionByline'),
        hasEmptyText
      ),
      safeProp('node')
    ),
    () => (
      <InlinePlaceholder>
        Credits
      </InlinePlaceholder>
    )
  )
)(always(undefined))
