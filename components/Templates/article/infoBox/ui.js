import InfoBoxIcon from 'react-icons/lib/fa/info'

import buttonStyles from '../../../Editor/styles/buttonStyles'
import InsertBlockButton from '../../../Editor/components/InsertBlockButton'

import { create } from './data'

export const InsertInfoBoxButton = props => (
  <InsertBlockButton
    block={create}
    {...props}
    {...buttonStyles.iconButton}
  >
    <InfoBoxIcon size={22} />
  </InsertBlockButton>
)
