import { Label } from '@project-r/styleguide'
import { FaImage as ImageIcon } from 'react-icons/fa'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  SizeButton,
  BreakoutIcon,
  DefaultIcon,
  EdgeToEdgeIcon,
} from '../common/breakouts.js'

import getNew from './getNew'

export const InsertFigureButton = withTheme()(
  props => {
    return (
      <InsertBlockButton
        block={getNew}
        {...props}
        {...props.styles.buttons.iconButton}
      >
        <ImageIcon size={22} />
      </InsertBlockButton>
    )
  }
)

export const FigureUI = withTheme()(
  ({ node, editor, styles }) => (
    <SelectionPath.Selected
      node={node}
      offset={2}
    >
      <div {...styles.layout.container}>
        <div {...styles.layout.headerSection}>
          <Label>Bildgrösse</Label>
        </div>
        <div {...styles.layout.section}>
          <SizeButton
            name={null}
            node={node}
            editor={editor}
          >
            <DefaultIcon />
          </SizeButton>
          <SizeButton
            name={'breakout'}
            node={node}
            editor={editor}
          >
            <BreakoutIcon />
          </SizeButton>
          <SizeButton
            name={'edgeToEdge'}
            node={node}
            editor={editor}
          >
            <EdgeToEdgeIcon />
          </SizeButton>
        </div>
      </div>
    </SelectionPath.Selected>
  )
)
