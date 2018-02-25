import { Center } from '@project-r/styleguide'
import { isBlock, when } from '../../Editor/utils'
import { isZone } from '../../Editor/utils/mdast'
import { renderBlock } from '../../Editor/utils/renderers'

export const CENTER = 'center'
export const CENTER_ZONE = 'CENTER'

export const CenterRule = {
  fromMdast: when(isZone(CENTER_ZONE), (node, next) => ({
    object: 'block',
    type: CENTER,
    data: node.data,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(CENTER), (node, next) => ({
    type: 'zone',
    identifier: CENTER_ZONE,
    data: node.data,
    children: next(node.nodes)
  }))
}

export const CenterPlugin = {
  renderNode: renderBlock(
    CENTER,
    ({ attributes, children }) => (
      <Center {...attributes}>{children}</Center>
    )
  )
}
