import { not, isBlock } from '../../../Editor/utils'
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
  matchMdast: isParagraph,
  match: isBlock(CAPTION),
  fromMdast(node, index, parent, { visitChildren }) {
    const captionText = {
      type: 'paragraph',
      children: node.children.filter(
        not(isOfType('emphasis'))
      )
    }

    const captionByline = node.children.find(
      isOfType('emphasis')
    ) || { type: 'emphasis', children: [] }

    return {
      object: 'block',
      type: CAPTION,
      nodes: [
        {
          kind: 'block',
          type: CAPTION_TEXT,
          nodes: visitChildren(captionText)
        },
        {
          kind: 'block',
          type: CAPTION_BYLINE,
          nodes: visitChildren(captionByline)
        }
      ]
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    const [captionBlock, bylineBlock] = node.nodes
    return {
      type: 'paragraph',
      children: [
        ...visitChildren(captionBlock),
        {
          type: 'emphasis',
          children: visitChildren(bylineBlock)
        }
      ]
    }
  },
  newNode() {
    return {
      object: 'block',
      type: CAPTION,
      nodes: [
        {
          kind: 'block',
          type: CAPTION_TEXT
        },
        {
          kind: 'block',
          type: CAPTION_BYLINE
        }
      ]
    }
  }
}
