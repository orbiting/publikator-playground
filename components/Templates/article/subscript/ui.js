import SubIcon from 'react-icons/lib/fa/subscript'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'

export const SubButton = props => (
  <ToggleMarkButton
    mark={'sub'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubIcon size={22} /> 
  </ToggleMarkButton>
)
