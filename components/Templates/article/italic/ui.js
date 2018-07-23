import ItalicIcon from 'react-icons/lib/fa/italic'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'

export const ItalicButton = props => (
  <ToggleMarkButton
    mark={'italic'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ItalicIcon size={22} />
  </ToggleMarkButton>
)
