import SubheadIcon from 'react-icons/lib/fa/header'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import FormatBlockButton from '../../../Editor/components/FormatBlockButton'

export const SubheadButton = props => (
  <FormatBlockButton
    block={'subhead'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubheadIcon />
  </FormatBlockButton>
)
