import { Label } from '@project-r/styleguide'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import { TextButtons } from '../common/ui'
import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'

export const CaptionTextUI = withTheme()(
  ({ styles, node, editor }) => {
    return (
      <SelectionPath.Selected
        node={node}
        offset={1}
      >
        <div {...styles.layout.container}>
          <div {...styles.layout.sectionHeader}>
            <Label>Format</Label>
          </div>
          <div {...styles.layout.section}>
            <BoldButton editor={editor} />
            <LinkButton editor={editor} />
          </div>
        </div>
        <TextButtons
          editor={editor}
          node={node}
        />
      </SelectionPath.Selected>
    )
  }
)

export const CaptionBylineUI = withTheme()(
  ({ styles, node, editor }) => {
    return (
      <SelectionPath.Selected
        node={node}
        offset={1}
      >
        <div {...styles.layout.container}>
          <div {...styles.layout.sectionHeader}>
            <Label>Format</Label>
          </div>
          <div {...styles.layout.actions}>
            <LinkButton editor={editor} />
          </div>
        </div>
        <TextButtons
          editor={editor}
          node={node}
        />
      </SelectionPath.Selected>
    )
  }
)