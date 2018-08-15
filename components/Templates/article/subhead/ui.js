import SubheadIcon from 'react-icons/lib/fa/header'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

import {
  BlockButtons,
  TextButtons,
  InsertButtons
} from '../common/ui'

export const SubheadButton = withTheme()(
  props => (
    <FormatBlockButton
      block={'subhead'}
      {...props}
      {...props.styles.buttons.iconButton}
    >
      <SubheadIcon size={22} />
    </FormatBlockButton>
  )
)

export const SubheadUI = ({ node, editor }) => (
  <SelectionPath.Selected offset={1} node={node}>
    <InsertButtons node={node} editor={editor} />
    <BlockButtons node={node} editor={editor} />
    <TextButtons node={node} editor={editor} />
  </SelectionPath.Selected>
)
