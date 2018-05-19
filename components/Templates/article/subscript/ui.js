import SubIcon from 'react-icons/lib/fa/subscript'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import MarkButton from '../../../Editor/components/MarkButton'

export const SubButton = props => (
  <MarkButton
    mark={'sub'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubIcon size={22} /> 
  </MarkButton>
)
