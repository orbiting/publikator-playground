import ParagraphIcon from 'react-icons/lib/fa/paragraph'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'

export const ParagraphButton = props => (
  <FormatBlockButton
    block={'paragraph'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ParagraphIcon size={22} /> 
  </FormatBlockButton>
)
