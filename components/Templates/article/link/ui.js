import LinkIcon from 'react-icons/lib/fa/chain'

import buttonStyles from '../../../Editor/styles/buttonStyles'
import withNodeData from '../../../Editor/hoc/withNodeData'
import InlineButton from '../../../Editor/components/InlineButton'
import TextInput from '../../../Editor/components/TextInput'

export const LinkButton = props => (
  <InlineButton
    inline={{
      object: 'inline',
      type: 'link',
      data: {
        url: '',
        title: ''
      }
    }}
    {...props}
    {...buttonStyles.iconButton}
  >
    <LinkIcon />
  </InlineButton>
)

export const LinkUrlInput = withNodeData('url')(
  props => (
    <TextInput
      type="text"
      label="URL"
      {...props}
    />
  )
)
