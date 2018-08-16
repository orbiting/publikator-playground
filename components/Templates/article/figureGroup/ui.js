import { Label } from '@project-r/styleguide'
import { ImageIcon } from 'react-icons/fa'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  SizeButton,
  BreakoutIcon,
  DefaultIcon
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

export const FigureGroupUI = withTheme()(
  ({ node, editor, styles }) => (
    <SelectionPath.Selected
      offset={3}
      node={node}
    >
      <div {...styles.layout.container}>
        <div {...styles.layout.headerSection}>
          <Label>Bildergruppe</Label>
        </div>
        <hr {...styles.layout.hairline} />
        <div {...styles.layout.headerSection}>
          <Label>Grösse</Label>
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
        </div>
      </div>
    </SelectionPath.Selected>
  )
)
