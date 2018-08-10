import { ifElse, compose, always } from 'ramda'
import { Editorial } from '@project-r/styleguide'

import {
  isBlock,
  safeProp
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import {
  TextButtons,
  InsertButtons
} from '../common/ui'
import { ParagraphButton } from '../paragraph/ui'
import { SubheadButton } from '../subhead/ui'
import { OrderedListButton } from '../orderedList/ui'
import { UnorderedListButton } from './ui'

const toFlatBlockConversion = (
  change,
  node,
  block
) => {
  if (block === 'orderedList') {
    return change.setNodeByKey(node.key, {
      type: 'orderedList'
    })
  }

  return node.nodes.reduce(
    (t, listItem) =>
      t
        .setNodeByKey(listItem.key, {
          type: block
        })
        .unwrapBlockByKey(listItem.key),
    change
  )
}

export default {
  renderNode: ifElse(
    compose(
      isBlock('unorderedList'),
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
        <SelectionPath.OptionGroup
          label={'Block'}
        >
          <ParagraphButton
            node={node}
            editor={editor}
            conversionStrategy={
              toFlatBlockConversion
            }
          />
          <SubheadButton
            node={node}
            editor={editor}
            conversionStrategy={
              toFlatBlockConversion
            }
          />
          <UnorderedListButton
            node={node}
            editor={editor}
          />
          <OrderedListButton
            node={node}
            editor={editor}
          />
        </SelectionPath.OptionGroup>
        <TextButtons
          node={node}
          editor={editor}
        />
      </SelectionPath.Options>,
      <Editorial.UL key="content" {...attributes}>
        {children}
      </Editorial.UL>
    ],
    always(undefined)
  )
}