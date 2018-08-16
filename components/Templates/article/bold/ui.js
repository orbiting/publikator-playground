import { BoldIcon } from 'react-icons/fa'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

export const BoldButton = withTheme()(props => (
  <ToggleMarkButton
    mark={'bold'}
    {...props}
    {...props.styles.buttons.iconButton}
  >
    <BoldIcon size={22} />
  </ToggleMarkButton>
))
