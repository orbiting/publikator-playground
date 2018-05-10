import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'

import {
  isBlock,
  safeProp
} from '../../../Editor/lib'

import SelectionPath from '../../../Editor/components/SelectionPath'
import {
  BlockButtons,
  TextButtons,
  InsertButtons
} from '../common/ui'
import { BoldButton } from '../bold/ui'
import { ItalicButton } from '../italic/ui'
import { LinkButton } from '../link/ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('paragraph'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => [
      <SelectionPath.Options
        offset={1}
        key="ui"
        node={node}
      >
        <InsertButtons
          node={node}
          editor={editor}
        />
        <BlockButtons
          node={node}
          editor={editor}
        />
        <SelectionPath.OptionGroup
          label={'Format'}
        >
          <BoldButton
            node={node}
            editor={editor}
          />
          <ItalicButton
            node={node}
            editor={editor}
          />
          <LinkButton
            node={node}
            editor={editor}
          />
        </SelectionPath.OptionGroup>
        <TextButtons
          node={node}
          editor={editor}
        />
      </SelectionPath.Options>,
      <Editorial.P key="content" {...attributes}>
        {children}
      </Editorial.P>
    ],
    always(undefined)
  )
}
