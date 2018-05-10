import OptionGroup from '../../../Editor/components/SelectionPath/OptionGroup'
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
  <OptionGroup label={'Block'}>
    <ParagraphButton
      node={node}
      editor={editor}
    />
    <SubheadButton node={node} editor={editor} />
  </OptionGroup>
)

export const InsertButtons = ({
  node,
  editor
}) => (
  <OptionGroup label={'Einfügen'}>
    <InsertFigureButton
      node={node}
      editor={editor}
    />
    <InsertInfoBoxButton
      node={node}
      editor={editor}
    />
  </OptionGroup>
)

export const TextButtons = ({ editor }) => (
  <OptionGroup label={'Text'}>
    <SupButton editor={editor} />
    <SubButton editor={editor} />
  </OptionGroup>
)
