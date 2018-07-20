import SubIcon from 'react-icons/lib/fa/subscript'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import MarkButton from '@orbiting/publikator-editor/components/MarkButton'

export const SubButton = props => (
  <MarkButton
    mark={'sub'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubIcon size={22} /> 
  </MarkButton>
)
