import InfoBoxIcon from 'react-icons/lib/fa/info'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'

import getNew from './getNew'

export const InsertInfoBoxButton = props => (
  <InsertBlockButton
    block={getNew}
    {...props}
    {...buttonStyles.iconButton}
  >
    <InfoBoxIcon size={22} />
  </InsertBlockButton>
)
