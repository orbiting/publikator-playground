import { isOfType } from '../../Editor/utils/mdast'
import { isDocument, when } from '../../Editor/utils'

export const DocumentRule = {
  fromMdast: when(isOfType('root'), (node, next) => ({
    nodes: next(node.children),
    data: node.meta
  })),
  toMdast: when(isDocument, (node, next) => ({
    type: 'root',
    children: next(node.nodes),
    meta: node.data
  }))
}
