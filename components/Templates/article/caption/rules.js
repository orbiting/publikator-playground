import { when, isBlock } from '../../../Editor/utils'
import {
  isParagraph,
  isOfType
} from '../../../Editor/utils/mdast'

import {
  CAPTION,
  CAPTION_TEXT,
  CAPTION_BYLINE
} from './constants'

export const CaptionRule = {
  fromMdast: when(isParagraph, (node, next) => {
    const [lastChild, ...rest] = node.children.reverse()

    const textNodes = isOfType('emphasis', lastChild)
      ? rest.reverse()
      : node.children

    const bylineNodes = isOfType('emphasis', lastChild)
      ? lastChild.children
      : []

    return {
      object: 'block',
      type: CAPTION,
      nodes: [
        {
          object: 'block',
          type: CAPTION_TEXT,
          nodes: next(textNodes)
        },
        {
          object: 'block',
          type: CAPTION_BYLINE,
          nodes: next(bylineNodes)
        }
      ]
    }
  }),
  toMdast: when(isBlock(CAPTION), (node, next) => {
    const [text, byline] = node.nodes
    let children = next(text.nodes) || []
    if (byline.nodes && byline.nodes.length) {
      children = children.concat({
        type: 'emphasis',
        children: next(byline.nodes)
      })
    }
    return {
      type: 'paragraph',
      children
    }
  }),
  newNode() {
    return {
      object: 'block',
      type: CAPTION,
      nodes: [
        {
          object: 'block',
          type: CAPTION_TEXT
        },
        {
          object: 'block',
          type: CAPTION_BYLINE
        }
      ]
    }
  },
  isEmpty(node) {
    const [text, byline] = node.nodes
    return !(
      (text.nodes && text.nodes.length) ||
      (byline.nodes && byline.nodes.lengh)
    )
  }
}
