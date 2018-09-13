import { Label } from '@project-r/styleguide'
import { FaFileImage as ChangeImageIcon } from 'react-icons/fa'

import ImageInput from '@orbiting/publikator-editor/components/ImageInput'
import { withNodeData } from '@orbiting/publikator-editor/apps/nodeData'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import Selected from '@orbiting/publikator-editor/components/Selected'
import { SidebarTop } from '@orbiting/publikator-editor/components/UI'

export const SelectImageButton = withNodeData({
  fieldName: 'url',
})(ImageInput)

export const FigureImageUI = withTheme()(
  ({ node, editor, styles }) => (
    <Selected offset={3} node={node}>
      <SidebarTop>
        <div {...styles.layout.container}>
          <div {...styles.layout.headerSection}>
            <Label>Bild</Label>
          </div>
          <SelectImageButton
            node={node}
            editor={editor}
            {...styles.buttons.iconButton}
          >
            <ChangeImageIcon size={22} />
          </SelectImageButton>
        </div>
      </SidebarTop>
    </Selected>
  )
)
