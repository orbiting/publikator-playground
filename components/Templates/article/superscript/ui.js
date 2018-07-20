import SupIcon from 'react-icons/lib/fa/superscript'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import MarkButton from '@orbiting/publikator-editor/components/MarkButton'

export const SupButton = props => (
  <MarkButton
    mark={'sup'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SupIcon size={22} /> 
  </MarkButton>
)
