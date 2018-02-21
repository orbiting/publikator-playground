import { isOfType } from '../../Editor/utils/mdast'
import { isDocument } from '../../Editor/utils'

export const DocumentRule = {
  matchMdast: isOfType('root'),
  match: isDocument,
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      document: {
        nodes: visitChildren(node),
        data: node.meta
      }
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'root',
      children: visitChildren(node),
      meta: node.data
    }
  }
}
