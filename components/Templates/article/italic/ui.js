import ItalicIcon from 'react-icons/lib/fa/italic'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import MarkButton from '../../../Editor/components/MarkButton'

export const ItalicButton = props => (
  <MarkButton
    mark={'italic'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ItalicIcon />
  </MarkButton>
)