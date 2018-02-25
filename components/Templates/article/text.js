import { isText, when } from '../../Editor/utils'
import { isOfType } from '../../Editor/utils/mdast'

export const TextRule = {
  matchMdast: isOfType('text'),
  match: isText,
  fromMdast: when(isOfType('text'), node => ({
    object: 'text',
    leaves: [
      {
        object: 'leaf',
        text: node.value
      }
    ]
  })),
  toMdast: when(isText, node => ({
    type: 'text',
    value: node.text
  }))
}
