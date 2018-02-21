import { isBlock } from '../../../Editor/utils'
import {
  isImageParagraph,
  isZone,
  matchOrNew,
  getExactNodes
} from '../../../Editor/utils/mdast'

import { CaptionRule } from '../caption/rules'

import {
  FIGURE,
  FIGURE_IMAGE,
  FIGURE_ZONE
} from './constants'

export const ImageRule = {
  matchMdast: isImageParagraph,
  match: isBlock(FIGURE_IMAGE),
  fromMdast(node) {
    return {
      object: 'block',
      type: FIGURE_IMAGE,
      isVoid: true,
      data: {
        url: node.children[0].url,
        title: node.children[0].title,
        alt: node.children[0].alt
      }
    }
  },
  toMdast(node) {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'image',
          url: node.data.url,
          title: node.data.title,
          alt: node.data.alt
        }
      ]
    }
  },
  newNode() {
    return {
      object: 'block',
      type: FIGURE_IMAGE,
      isVoid: true,
      data: {
        url: '',
        title: '',
        alt: ''
      }
    }
  }
}

const getFigureNodes = getExactNodes(
  matchOrNew(ImageRule),
  matchOrNew(CaptionRule)
)

export const FigureRule = {
  matchMdast: isZone(FIGURE_ZONE),
  match: isBlock(FIGURE),
  fromMdast(node, index, parent, rest) {
    return {
      object: 'block',
      type: FIGURE,
      nodes: getFigureNodes(node, index, parent, rest)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: 'FIGURE',
      data: node.data,
      children: visitChildren(node)
    }
  }
}
