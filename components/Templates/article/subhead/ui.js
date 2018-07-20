import SubheadIcon from 'react-icons/lib/fa/header'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'

export const SubheadButton = props => (
  <FormatBlockButton
    block={'subhead'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubheadIcon size={22} /> 
  </FormatBlockButton>
)
