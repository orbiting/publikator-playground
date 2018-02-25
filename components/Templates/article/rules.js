import { isBlock, when } from '../../Editor/utils'

import { isZone } from '../../Editor/utils/mdast'

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
  fromMdast: when(
    isZone('FIGUREGROUP'),
    (node, next) => ({
      object: 'block',
      type: 'figureGroup',
      data: node.data,
      nodes: next(node.children)
    })
  ),
  toMdast: when(
    isBlock('figureGroup'),
    (node, next) => ({
      type: 'zone',
      identifier: 'FIGUREGROUP',
      data: node.data,
      children: next(node.nodes)
    })
  )
}

export default [
  DocumentRule,
  InfoboxRule,
  CenterRule,
  FigureRule,
  figureGroupRule,
  TitleBlockRule,
  ParagraphRule,
  SubheadRule,
  BoldRule,
  SuperscriptRule,
  SubscriptRule,
  LinkRule,
  TextRule
]
