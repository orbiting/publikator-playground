import { isBlock, when } from '../../../Editor/utils'
import {
  isImageParagraph,
  isZone,
  transformOrNew,
  getExactNodes,
  transformIfNotEmpty
} from '../../../Editor/utils/mdast'

import { CaptionRule } from '../caption/rules'

import {
  FIGURE,
  FIGURE_IMAGE,
  FIGURE_ZONE
} from './constants'

export const ImageRule = {
  fromMdast: when(isImageParagraph, node => ({
    object: 'block',
    type: FIGURE_IMAGE,
    isVoid: true,
    data: {
      url: node.children[0].url,
      title: node.children[0].title,
      alt: node.children[0].alt
    }
  })),
  toMdast: when(isBlock(FIGURE_IMAGE), node => ({
    type: 'paragraph',
    children: [
      {
        type: 'image',
        url: node.data.url,
        title: node.data.title,
        alt: node.data.alt
      }
    ]
  })),
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
  },
  isEmpty(node) {
    return !node.data.url
  }
}

export const FigureNodesRule = {
  fromMdast: getExactNodes([
    transformOrNew(ImageRule.fromMdast, ImageRule.newNode),
    transformOrNew(
      CaptionRule.fromMdast,
      CaptionRule.newNode
    )
  ]),
  toMdast: getExactNodes([
    transformIfNotEmpty(
      ImageRule.toMdast,
      ImageRule.isEmpty
    ),
    transformIfNotEmpty(
      CaptionRule.toMdast,
      CaptionRule.isEmpty
    )
  ]),
  isEmpty(nodes) {
    return (
      !nodes ||
      [ImageRule.isEmpty, CaptionRule.isEmpty].every(
        (fn, i) => fn(nodes[i])
      )
    )
  }
}

export const FigureRule = {
  fromMdast: when(isZone(FIGURE_ZONE), (node, next) => ({
    object: 'block',
    type: FIGURE,
    data: node.data,
    nodes: FigureNodesRule.fromMdast(node.children, next)
  })),
  toMdast: when(isBlock(FIGURE), (node, next) => ({
    type: 'zone',
    identifier: 'FIGURE',
    data: node.data,
    children: FigureNodesRule.toMdast(node.nodes, next)
  })),
  isEmpty(node) {
    return FigureNodesRule.isEmpty(node.nodes)
  }
}
