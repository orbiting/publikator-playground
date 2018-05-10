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
import { LinkButton } from '../link/ui'

export default {
  renderNode: ifElse(
    compose(isBlock('subhead'), safeProp('node')),
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
        <LinkButton node={node} editor={editor} />
        <TextButtons
          node={node}
          editor={editor}
        />
      </SelectionPath.Options>,
      <Editorial.Subhead
        key="content"
        {...attributes}
      >
        {children}
      </Editorial.Subhead>
    ],
    always(undefined)
  )
}
