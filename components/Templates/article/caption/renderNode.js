import {
  FigureCaption,
  FigureByline
} from '@project-r/styleguide'

import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import { TextButtons } from '../common/ui'
import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'

export default compose(
  ifElse(
    compose(
      isBlock('caption'),
      safeProp('node')
    ),
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
