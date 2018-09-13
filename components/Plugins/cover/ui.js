import { Label } from '@project-r/styleguide'
import { withTheme } from '../../Editor/apps/theme'
import Selected from '../../Editor/components/Selected'
import { SidebarBottom } from '../../Editor/components/UI'

import {
  SizeButton,
  TinyIcon,
  DefaultIcon,
  EdgeToEdgeIcon,
} from '../common/breakouts.js'

export const CoverUI = withTheme()(
  ({ styles, node, editor }) => {
    return (
      <Selected node={node} offset={2}>
        <SidebarBottom>
          <div {...styles.layout.container}>
            <div {...styles.layout.sectionHeader}>
              <Label>Cover</Label>
            </div>
            <hr {...styles.layout.hairline} />
            <div {...styles.layout.sectionHeader}>
              <Label>Grösse</Label>
            </div>
            <div {...styles.layout.actions}>
              <SizeButton
                name="tiny"
                node={node}
                editor={editor}
              >
                <TinyIcon />
              </SizeButton>
              <SizeButton
                name="center"
                node={node}
                editor={editor}
              >
                <DefaultIcon />
              </SizeButton>
              <SizeButton
                name={null}
                node={node}
                editor={editor}
              >
                <EdgeToEdgeIcon />
              </SizeButton>
            </div>
          </div>
        </SidebarBottom>
      </Selected>
    )
  }
)
