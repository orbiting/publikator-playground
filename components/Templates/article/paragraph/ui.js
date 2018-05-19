import ParagraphIcon from 'react-icons/lib/fa/paragraph'
import buttonStyles from '../../../Editor/styles/buttonStyles'
import FormatBlockButton from '../../../Editor/components/FormatBlockButton'

export const ParagraphButton = props => (
  <FormatBlockButton
    block={'paragraph'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ParagraphIcon size={22} /> 
  </FormatBlockButton>
)
