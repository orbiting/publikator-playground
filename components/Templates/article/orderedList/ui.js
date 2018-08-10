import OrderedListIcon from 'react-icons/lib/fa/list-ol'
import { isBlock } from '@orbiting/publikator-editor/lib'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import FormatBlockButton from '@orbiting/publikator-editor/components/FormatBlockButton'

const conversionStrategy = (change, node) => {
  if (isBlock('unorderedList', node)) {
    return change.setNodeByKey(node.key, {
      type: 'orderedList'
    })
  }

  return change
    .setNodeByKey(node.key, { type: 'listItem' })
    .wrapBlockByKey(node.key, {
      type: 'orderedList'
    })
}

export const OrderedListButton = props => (
  <FormatBlockButton
    {...props}
    {...buttonStyles.iconButton}
    block={'orderedList'}
    conversionStrategy={conversionStrategy}
  >
    <OrderedListIcon size={22} />
  </FormatBlockButton>
)
