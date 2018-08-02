import ImageIcon from 'react-icons/lib/fa/image'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'

import getNew from './getNew'

export const InsertGroupedFigureButton = props => {
  return (
    <InsertBlockButton
      block={getNew}
      insertAfter
      {...props}
      {...buttonStyles.iconButton}
    >
      <ImageIcon size={22} />
    </InsertBlockButton>
  )
}
