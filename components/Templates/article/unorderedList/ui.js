import UnorderedListIcon from 'react-icons/lib/fa/list-ul'
import { isBlock } from '@orbiting/publikator-editor/lib'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'

const conversionStrategy = (change, node) => {
  if (isBlock('orderedList', node)) {
    return change.setNodeByKey(node.key, {
      type: 'unorderedList'
    })
  }

  return change
    .setNodeByKey(node.key, { type: 'listItem' })
    .wrapBlockByKey(node.key, {
      type: 'unorderedList'
    })
}

export const UnorderedListButton = props => (
  <FormatBlockButton
    {...props}
    {...buttonStyles.iconButton}
    block={'unorderedList'}
    conversionStrategy={conversionStrategy}
  >
    <UnorderedListIcon size={22} />
  </FormatBlockButton>
)
