import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'

import {
  isZone,
  isParagraph,
  isHeading,
  getExactNodes,
  transformOrNew,
  transformOrSkip
} from '../../Editor/utils/mdast'

import {
  isBlock,
  when,
  returnFirst
} from '../../Editor/utils'

import {
  renderBlock,
  renderPlaceholder
} from '../../Editor/utils/renderers'

import {
  preventSplit,
  preventForwardMerge,
  preventBackwardMerge
} from '../../Editor/utils/keyDown'

export const TITLE = 'title'
export const LEAD = 'lead'
export const CREDITS = 'credits'
export const TITLE_BLOCK = 'titleBlock'

export const TITLE_BLOCK_ZONE = 'TITLE'

export const TitleRule = {
  fromMdast: when(isHeading(1), (node, next) => ({
    object: 'block',
    type: TITLE,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(TITLE), (node, next) => ({
    type: 'heading',
    depth: 1,
    children: next(node.nodes)
  })),
  newNode() {
    return {
      object: 'block',
      type: TITLE
    }
  }
}

export const LeadRule = {
  fromMdast: when(isParagraph, (node, next) => ({
    object: 'block',
    type: LEAD,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(LEAD), (node, next) => ({
    type: 'paragraph',
    children: next(node.nodes)
  })),
  newNode() {
    return {
      object: 'block',
      type: LEAD
    }
  }
}

export const CreditsRule = {
  fromMdast: when(isParagraph, (node, next) => ({
    object: 'block',
    type: CREDITS,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(CREDITS), (node, next) => ({
    type: 'paragraph',
    children: next(node.nodes)
  })),
  newNode() {
    return {
      object: 'block',
      type: CREDITS
    }
  }
}

export const getTitleBlockNodes = getExactNodes([
  transformOrNew(TitleRule.fromMdast, TitleRule.newNode),
  transformOrSkip(LeadRule.fromMdast),
  transformOrNew(CreditsRule.fromMdast, CreditsRule.newNode)
])

export const getTitleBlockChildren = getExactNodes([
  TitleRule.toMdast,
  transformOrSkip(LeadRule.toMdast),
  CreditsRule.toMdast
])

export const TitleBlockRule = {
  fromMdast: when(
    isZone(TITLE_BLOCK_ZONE),
    (node, next) => ({
      object: 'block',
      type: TITLE_BLOCK,
      data: node.data,
      nodes: getTitleBlockNodes(node.children, next)
    })
  ),
  toMdast: when(isBlock(TITLE_BLOCK), (node, next) => ({
    type: 'zone',
    identifier: TITLE_BLOCK_ZONE,
    data: node.data,
    children: getTitleBlockChildren(node.nodes, next)
  }))
}

export const TitlePlugin = {
  renderNode: renderBlock(
    TITLE,
    ({ children, attributes }) => (
      <Editorial.Headline
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Headline>
    )
  ),
  onKeyDown: returnFirst(
    preventSplit(isBlock(TITLE)),
    preventBackwardMerge(isBlock(TITLE)),
    preventForwardMerge(isBlock(TITLE))
  ),
  renderPlaceholder: renderPlaceholder(TITLE, 'Title')
}

export const LeadPlugin = {
  renderNode: renderBlock(
    LEAD,
    ({ children, attributes }) => (
      <Editorial.Lead
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Lead>
    )
  ),
  onKeyDown: returnFirst(
    preventSplit(isBlock(LEAD)),
    preventBackwardMerge(isBlock(LEAD)),
    preventForwardMerge(isBlock(LEAD))
  ),
  renderPlaceholder: renderPlaceholder(LEAD, 'Lead')
}

export const CreditsPlugin = {
  renderNode: renderBlock(
    CREDITS,
    ({ children, attributes }) => (
      <Editorial.Credit
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </Editorial.Credit>
    )
  ),
  onKeyDown: returnFirst(
    preventSplit(isBlock(CREDITS)),
    preventBackwardMerge(isBlock(CREDITS)),
    preventForwardMerge(isBlock(CREDITS))
  ),
  renderPlaceholder: renderPlaceholder(
    CREDITS,
    'Autoren, Datum'
  )
}

export const TitleBlockPlugin = {
  renderNode: renderBlock(
    TITLE_BLOCK,
    ({ children, attributes }) => (
      <TitleBlock {...attributes}>{children}</TitleBlock>
    )
  )
}

export default {
  rules: [TitleBlockRule],
  plugins: [
    TitleBlockPlugin,
    TitlePlugin,
    LeadPlugin,
    CreditsPlugin
  ]
}
