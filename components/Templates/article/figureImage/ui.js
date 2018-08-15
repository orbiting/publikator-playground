import { Label } from '@project-r/styleguide'
import ChangeImageIcon from 'react-icons/lib/fa/exchange'

import ImageInput from '@orbiting/publikator-editor/components/ImageInput'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

const SelectImageButton = withNodeData('url')(
  ImageInput
)
export const FigureImageUI = withTheme()(
  ({ node, editor, styles }) => (
    <SelectionPath.Selected
      offset={3}
      node={node}
    >
      <div {...styles.layout.container}>
        <div {...styles.layout.headerSection}>
          <Label>Bildergruppe</Label>
        </div>
        <SelectImageButton
          node={node}
          editor={editor}
          {...styles.buttons.iconButton}
        >
          <ChangeImageIcon size={22} />
        </SelectImageButton>
      </div>
    </SelectionPath.Selected>
  )
)
