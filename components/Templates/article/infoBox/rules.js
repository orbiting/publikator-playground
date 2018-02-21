import {
  isHeading,
  isParagraph,
  isZone,
  getNodes,
  matchOrNew,
  matchOrSkip
} from '../../../Editor/utils/mdast'
import { isBlock } from '../../../Editor/utils'

import { FigureRule } from '../figure/rules'

import {
  INFOBOX,
  INFOBOX_TITLE,
  INFOBOX_TEXT,
  INFOBOX_ZONE
} from './constants'

export const InfoboxTitleRule = {
  matchMdast: isHeading(3),
  match: isBlock(INFOBOX_TITLE),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: INFOBOX_TITLE,
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'heading',
      depth: 3,
      children: visitChildren(node)
    }
  },
  newNode() {
    return {
      object: 'block',
      type: INFOBOX_TITLE
    }
  }
}

export const InfoboxTextRule = {
  matchMdast: isParagraph,
  match: isBlock(INFOBOX_TEXT),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: INFOBOX_TEXT,
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'paragraph',
      children: visitChildren(node)
    }
  },
  newNode() {
    return {
      object: 'block',
      type: INFOBOX_TEXT
    }
  }
}

const getInfoboxNodes = getNodes(
  matchOrNew(InfoboxTitleRule),
  matchOrSkip(FigureRule),
  matchOrNew(InfoboxTextRule)
)

export const InfoboxRule = {
  matchMdast: isZone(INFOBOX_ZONE),
  match: isBlock(INFOBOX),
  fromMdast(node, index, parent, rest) {
    return {
      object: 'block',
      type: INFOBOX,
      nodes: getInfoboxNodes(node, index, parent, rest)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: INFOBOX_ZONE,
      data: node.data,
      children: visitChildren(node)
    }
  }
}
