import SupIcon from 'react-icons/lib/fa/superscript'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'

export const SupButton = props => (
  <ToggleMarkButton
    mark={'sup'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SupIcon size={22} /> 
  </ToggleMarkButton>
)
