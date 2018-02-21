import { isDocument, isBlock } from '../../Editor/utils'

import { isOfType, isZone } from '../../Editor/utils/mdast'

import { FigureRule } from './figure/rules'
import { LinkRule } from './link'
import {
  BoldRule,
  SuperscriptRule,
  SubscriptRule
} from './marks'
import { ParagraphRule, SubheadRule } from './blocks'
import { TitleBlockRule } from './titleBlock'
import { InfoboxRule } from './infoBox/rules'
import { TextRule } from './text'
import { CenterRule } from './center'
import { DocumentRule } from './document'

const figureGroupRule = {
  matchMdast: isZone('FIGUREGROUP'),
  match: isBlock('figureGroup'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'figureGroup',
      data: node.data,
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: 'FIGUREGROUP',
      data: node.data,
      children: visitChildren(node)
    }
  }
}

export default [
  DocumentRule,
  TextRule,
  CenterRule,
  InfoboxRule,
  FigureRule,
  figureGroupRule,
  ParagraphRule,
  SubheadRule,
  TitleBlockRule,
  BoldRule,
  SuperscriptRule,
  SubscriptRule,
  LinkRule
]
