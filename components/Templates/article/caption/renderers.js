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
} from '../../../Editor/lib'

import { InlinePlaceholder } from '../../../Editor/components/Placeholder'
import SelectionPath from '../../../Editor/components/SelectionPath'

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
      <SelectionPath.Options
        key="ui"
        node={node}
        offset={1}
      >
        <SelectionPath.OptionGroup label="Format">
          <BoldButton editor={editor} />
          <LinkButton editor={editor} />
        </SelectionPath.OptionGroup>
        <TextButtons
          editor={editor}
          node={node}
        />
      </SelectionPath.Options>,
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
      <SelectionPath.Options
        key="ui"
        node={node}
        offset={1}
      >
        <SelectionPath.OptionGroup label="Format">
          <LinkButton editor={editor} />
        </SelectionPath.OptionGroup>
        <TextButtons
          editor={editor}
          node={node}
        />
      </SelectionPath.Options>,
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
