import { Text } from 'slate'
import { FaListOl as OrderedListIcon } from 'react-icons/fa'
import { Label } from '@project-r/styleguide'

import { isBlock } from '@orbiting/publikator-editor/lib'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import Selected from '@orbiting/publikator-editor/components/Selected'
import {
  SidebarTextOptions,
  SidebarInsertOptions,
  SidebarBlockOptions,
  SidebarFormatOptions,
} from '@orbiting/publikator-editor/components/UI'

import {
  TextButtons,
  InsertButtons,
} from '../common/ui'
import { ParagraphButton } from '../paragraph/ui'
import { SubheadButton } from '../subhead/ui'
import { UnorderedListButton } from '../unorderedList/ui'
import { BoldButton } from '../bold/ui'
import { ItalicButton } from '../italic/ui'
import { LinkButton } from '../link/ui'

const conversionStrategy = (change, node) => {
  if (isBlock('unorderedList', node)) {
    return change.setNodeByKey(node.key, {
      type: 'orderedList',
    })
  }

  return change
    .setNodeByKey(node.key, {
      type: 'listItem',
      nodes: Text.create(node.text),
    })
    .wrapBlockByKey(node.key, {
      type: 'orderedList',
    })
}

const toFlatBlockConversion = (
  change,
  node,
  block
) => {
  return node.nodes.reduce(
    (t, listItem) =>
      t
        .setNodeByKey(listItem.key, {
          type: block,
        })
        .unwrapBlockByKey(listItem.key),
    change
  )
}

export const OrderedListButton = withTheme()(
  props => (
    <FormatBlockButton
      {...props}
      {...props.styles.buttons.iconButton}
      block={'orderedList'}
      conversionStrategy={conversionStrategy}
    >
      <OrderedListIcon size={22} />
    </FormatBlockButton>
  )
)

export const OrderedListUI = withTheme()(
  ({ node, editor, styles }) => {
    return (
      <Selected offset={1} key="ui" node={node}>
        <SidebarInsertOptions>
          <InsertButtons
            node={node}
            editor={editor}
          />
        </SidebarInsertOptions>

        <SidebarBlockOptions>
          <div {...styles.layout.container}>
            <div {...styles.layout.sectionHeader}>
              <Label>Block</Label>
            </div>
            <div {...styles.layout.actions}>
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
            </div>
          </div>
        </SidebarBlockOptions>
        <SidebarFormatOptions>
          <div {...styles.layout.container}>
            <div {...styles.layout.sectionHeader}>
              <Label>Format</Label>
            </div>
            <div {...styles.layout.actions}>
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
            </div>
          </div>
        </SidebarFormatOptions>
        <SidebarTextOptions>
          <TextButtons
            node={node}
            editor={editor}
          />
        </SidebarTextOptions>
      </Selected>
    )
  }
)
