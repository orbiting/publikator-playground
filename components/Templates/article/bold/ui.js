import BoldIcon from 'react-icons/lib/fa/bold'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import MarkButton from '@orbiting/publikator-editor/components/MarkButton'

export const BoldButton = props => (
  <MarkButton
    mark={'bold'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <BoldIcon size={22} />
  </MarkButton>
)
