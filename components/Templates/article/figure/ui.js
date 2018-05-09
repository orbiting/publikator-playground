import ImageIcon from 'react-icons/lib/fa/image'

import buttonStyles from '../../../Editor/styles/buttonStyles'
import InsertBlockButton from '../../../Editor/components/InsertBlockButton'

import { create } from './data'

export const InsertFigureButton = props => (
  <InsertBlockButton
    block={create}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ImageIcon />
  </InsertBlockButton>
)
