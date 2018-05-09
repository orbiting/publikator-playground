import { ParagraphButton } from '../paragraph/ui'
import { SubheadButton } from '../subhead/ui'
import { InsertFigureButton } from '../figure/ui'
import { InsertInfoBoxButton } from '../infoBox/ui'
import { SubButton } from '../subscript/ui'
import { SupButton } from '../superscript/ui'

export const BlockButtons = ({
  node,
  editor
}) => (
  <span>
    <ParagraphButton
      node={node}
      editor={editor}
    />
    <SubheadButton node={node} editor={editor} />
  </span>
)

export const InsertButtons = ({
  node,
  editor
}) => (
  <span>
    <InsertFigureButton
      node={node}
      editor={editor}
    />
    <InsertInfoBoxButton
      node={node}
      editor={editor}
    />
  </span>
)

export const TextButtons = ({ editor }) => (
  <span>
    <SupButton editor={editor} />
    <SubButton editor={editor} />
  </span>
)
