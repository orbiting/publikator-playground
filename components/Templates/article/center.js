import { Center } from '@project-r/styleguide'
import { isBlock } from '../../Editor/utils'
import { isZone } from '../../Editor/utils/mdast'
import { renderBlock } from '../../Editor/utils/renderers'

export const CenterRule = {
  matchMdast: isZone('CENTER'),
  match: isBlock('center'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'center',
      data: node.data,
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: 'CENTER',
      data: node.data,
      children: visitChildren(node)
    }
  }
}

export const CenterPlugin = {
  renderNode: renderBlock(
    'center',
    ({ attributes, children }) => (
      <Center {...attributes}>{children}</Center>
    )
  )
}
