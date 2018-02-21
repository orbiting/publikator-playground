import { isText } from '../../Editor/utils'
import { isOfType } from '../../Editor/utils/mdast'

export const TextRule = {
  matchMdast: isOfType('text'),
  match: isText,
  fromMdast(node) {
    return {
      object: 'text',
      leaves: [
        { object: 'leaf', text: node.value, marks: [] }
      ]
    }
  },
  toMdast(node) {
    return {
      type: 'text',
      value: node.leaves.reduce(
        (memo, leaf) => memo.concat(leaf.text),
        ''
      )
    }
  }
}
