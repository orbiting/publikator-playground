import { FaParagraph as ParagraphIcon } from 'react-icons/fa'
import { Label } from '@project-r/styleguide'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

import {
  BlockButtons,
  TextButtons,
  InsertButtons,
} from '../common/ui'
import { BoldButton } from '../bold/ui'
import { ItalicButton } from '../italic/ui'
import { LinkButton } from '../link/ui'

export const ParagraphButton = withTheme()(
  props => (
    <FormatBlockButton
      block={'paragraph'}
      {...props}
      {...props.styles.buttons.iconButton}
    >
      <ParagraphIcon size={22} />
    </FormatBlockButton>
  )
)

export const ParagraphUI = withTheme()(
  ({ node, editor, styles }) => (
    <SelectionPath.Selected
      offset={1}
      node={node}
    >
      <InsertButtons
        node={node}
        editor={editor}
      />
      <BlockButtons node={node} editor={editor} />
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
      <TextButtons node={node} editor={editor} />
    </SelectionPath.Selected>
  )
)
