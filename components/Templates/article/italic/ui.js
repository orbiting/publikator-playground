import ItalicIcon from 'react-icons/lib/fa/italic'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import MarkButton from '@orbiting/publikator-editor/components/MarkButton'

export const ItalicButton = props => (
  <MarkButton
    mark={'italic'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ItalicIcon size={22} />
  </MarkButton>
)
