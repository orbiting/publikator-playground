import { FaHeading as SubheadIcon } from 'react-icons/fa'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import Selected from '@orbiting/publikator-editor/components/Selected'
import {
  SidebarTextOptions,
  SidebarInsertOptions,
  SidebarBlockOptions,
} from '@orbiting/publikator-editor/components/UI'

import {
  BlockButtons,
  TextButtons,
  InsertButtons,
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
  <Selected offset={1} node={node}>
    <SidebarInsertOptions>
      <InsertButtons
        node={node}
        editor={editor}
      />
    </SidebarInsertOptions>
    <SidebarBlockOptions>
      <BlockButtons node={node} editor={editor} />
    </SidebarBlockOptions>
    <SidebarTextOptions>
      <TextButtons node={node} editor={editor} />
    </SidebarTextOptions>
  </Selected>
)
