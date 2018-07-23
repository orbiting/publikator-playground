import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'
import { compose, ifElse, always } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import { TextButtons } from '../common/ui'
import { LinkButton } from '../link/ui'

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
    ({ children, attributes, editor, node }) => [
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
      <Editorial.Credit
        key="content"
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Credit>
    ]
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
