import BoldIcon from 'react-icons/lib/fa/bold'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import MarkButton from '../../../Editor/components/MarkButton'

export const BoldButton = props => (
  <MarkButton
    mark={'bold'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <BoldIcon />
  </MarkButton>
)
