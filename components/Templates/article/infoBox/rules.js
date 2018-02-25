import {
  isHeading,
  isParagraph,
  isZone,
  getExactNodes,
  transformOrNew,
  transformOrSkip,
  transformIfNotEmpty
} from '../../../Editor/utils/mdast'
import { isBlock, when } from '../../../Editor/utils'

import { FigureRule } from '../figure/rules'

import {
  INFOBOX,
  INFOBOX_TITLE,
  INFOBOX_TEXT,
  INFOBOX_ZONE
} from './constants'

export const InfoboxTitleRule = {
  fromMdast: when(isHeading(3), (node, next) => ({
    object: 'block',
    type: INFOBOX_TITLE,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(INFOBOX_TITLE), (node, next) => ({
    type: 'heading',
    depth: 3,
    nodes: next(node.nodes)
  })),
  newNode() {
    return {
      object: 'block',
      type: INFOBOX_TITLE
    }
  }
}

export const InfoboxTextRule = {
  fromMdast: when(isParagraph, (node, next) => ({
    object: 'block',
    type: INFOBOX_TEXT,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(INFOBOX_TEXT), (node, next) => {
    return {
      type: 'paragraph',
      children: next(node.nodes)
    }
  }),
  newNode() {
    return {
      object: 'block',
      type: INFOBOX_TEXT
    }
  },
  isEmpty(node) {
    return !node || !node.nodes || !node.nodes.length
  }
}

export const InfoboxNodesRule = {
  fromMdast: getExactNodes([
    transformOrNew(
      InfoboxTitleRule.fromMdast,
      InfoboxTitleRule.newNode
    ),
    transformOrSkip(FigureRule.fromMdast),
    transformOrNew(
      InfoboxTextRule.fromMdast,
      InfoboxTextRule.newNode
    )
  ]),
  toMdast: getExactNodes([
    InfoboxTitleRule.toMdast,
    transformOrSkip(FigureRule.toMdast),
    transformIfNotEmpty(
      InfoboxTextRule.toMdast,
      InfoboxTextRule.isEmpty
    )
  ]),
  isEmpty(nodes) {
    return (
      !nodes ||
      [
        InfoboxTitleRule.isEmpty,
        FigureRule.isEmpty,
        InfoboxTextRule.isEmpty
      ].every((fn, i) => fn(nodes[i]))
    )
  }
}

export const InfoboxRule = {
  fromMdast: when(isZone(INFOBOX_ZONE), (node, next) => ({
    object: 'block',
    type: INFOBOX,
    data: node.data,
    nodes: InfoboxNodesRule.fromMdast(node.children, next)
  })),
  toMdast: when(isBlock(INFOBOX), (node, next) => ({
    type: 'zone',
    identifier: INFOBOX_ZONE,
    data: node.data,
    children: InfoboxNodesRule.toMdast(node.nodes, next)
  }))
}
