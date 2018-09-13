import { Label } from '@project-r/styleguide'
import { FaFileImage as ChangeImageIcon } from 'react-icons/fa'

import ImageInput from '../../Editor/components/ImageInput'
import { withNodeData } from '../../Editor/apps/nodeData'
import { withTheme } from '../../Editor/apps/theme'
import Selected from '../../Editor/components/Selected'
import { SidebarTop } from '../../Editor/components/UI'

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
