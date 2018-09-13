import { Label } from '@project-r/styleguide'
import { withTheme } from '../../Editor/apps/theme'
import { ParagraphButton } from '../paragraph/ui'
import { SubheadButton } from '../subhead/ui'
import { InsertFigureButton } from '../figure/ui'
import { InsertInfoBoxButton } from '../infoBox/ui'
import { SubButton } from '../subscript/ui'
import { SupButton } from '../superscript/ui'
import {
  OrderedListButton,
  UnorderedListButton,
} from '../list/ui'

export const BlockButtons = withTheme()(
  ({ node, editor, styles }) => (
    <div {...styles.layout.container}>
      <div {...styles.layout.sectionHeader}>
        <Label>Block</Label>
      </div>

      <div {...styles.layout.actions}>
        <ParagraphButton
          node={node}
          editor={editor}
        />
        <SubheadButton
          node={node}
          editor={editor}
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
  )
)

export const InsertButtons = withTheme()(
  ({ node, editor, styles }) => (
    <div {...styles.layout.container}>
      <div {...styles.layout.sectionHeader}>
        <Label>Einfügen</Label>
      </div>

      <div {...styles.layout.actions}>
        <InsertFigureButton
          node={node}
          editor={editor}
        />
        <InsertInfoBoxButton
          node={node}
          editor={editor}
        />
      </div>
    </div>
  )
)
export const TextButtons = withTheme()(
  ({ editor, styles }) => (
    <div {...styles.layout.container}>
      <div {...styles.layout.sectionHeader}>
        <Label>Text</Label>
      </div>
      <div {...styles.layout.actions}>
        <SupButton editor={editor} />
        <SubButton editor={editor} />
      </div>
    </div>
  )
)
