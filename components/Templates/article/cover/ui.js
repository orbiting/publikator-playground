import { Label } from '@project-r/styleguide'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  SizeButton,
  TinyIcon,
  DefaultIcon,
  EdgeToEdgeIcon
} from '../common/breakouts.js'

export const CoverUI = withTheme()(
  ({ styles, node, editor }) => {
    return (
      <SelectionPath.Selected
        node={node}
        offset={2}
      >
        <div {...styles.layout.container}>
          <div {...styles.layout.sectionHeader}>
            <Label>Cover</Label>
          </div>
          <hr {...styles.layout.hairlines} />
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
      </SelectionPath.Selected>
    )
  }
)
