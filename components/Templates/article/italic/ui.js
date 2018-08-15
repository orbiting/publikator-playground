import ItalicIcon from 'react-icons/lib/fa/italic'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

export const ItalicButton = withTheme()(props => (
  <ToggleMarkButton
    mark={'italic'}
    {...props}
    {...props.styles.buttons.iconButton}
  >
    <ItalicIcon size={22} />
  </ToggleMarkButton>
))
