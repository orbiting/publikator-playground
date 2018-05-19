import SupIcon from 'react-icons/lib/fa/superscript'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import MarkButton from '../../../Editor/components/MarkButton'

export const SupButton = props => (
  <MarkButton
    mark={'sup'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SupIcon size={22} /> 
  </MarkButton>
)
