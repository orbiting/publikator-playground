import { FaImage as ImageIcon } from 'react-icons/fa'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

import getNew from './getNew'

export const InsertGroupedFigureButton = withTheme()(
  props => {
    return (
      <InsertBlockButton
        block={getNew}
        insertAfter
        {...props}
        {...props.styles.buttons.iconButton}
      >
        <ImageIcon size={22} />
      </InsertBlockButton>
    )
  }
)
