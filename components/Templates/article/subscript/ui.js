import { SubIcon } from 'react-icons/fa'
import ToggleMarkButton from '@orbiting/publikator-editor/components/ToggleMarkButton'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

export const SubButton = withTheme()(props => (
  <ToggleMarkButton
    mark={'sub'}
    {...props}
    {...props.styles.buttons.iconButton}
  >
    <SubIcon size={22} />
  </ToggleMarkButton>
))
