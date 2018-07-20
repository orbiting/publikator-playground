import ImageIcon from 'react-icons/lib/fa/image'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'

import { create } from './data'

export const InsertFigureButton = props => (
  <InsertBlockButton
    block={create}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ImageIcon size={22} /> 
  </InsertBlockButton>
)
