import { Label } from '@project-r/styleguide'

import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import Selected from '@orbiting/publikator-editor/components/Selected'
import {
  SidebarFormatOptions,
  SidebarTextOptions,
} from '@orbiting/publikator-editor/components/UI'

import { TextButtons } from '../common/ui'
import { LinkButton } from '../link/ui'

export const CreditsUI = withTheme()(
  ({ node, editor, styles }) => {
    return (
      <Selected key="ui" node={node} offset={1}>
        <SidebarFormatOptions>
          <div {...styles.layout.container}>
            <div {...styles.layout.sectionHeader}>
              <Label>Format</Label>
            </div>
            <div {...styles.layout.actions}>
              <LinkButton editor={editor} />
            </div>
          </div>
        </SidebarFormatOptions>
        <SidebarTextOptions>
          <TextButtons
            editor={editor}
            node={node}
          />
        </SidebarTextOptions>
      </Selected>
    )
  }
)
