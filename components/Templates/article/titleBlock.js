import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'

import {
  isZone,
  isParagraph,
  isHeading,
  getExactNodes,
  matchOrNew,
  matchOrSkip
} from '../../Editor/utils/mdast'

import { isBlock } from '../../Editor/utils'

import {
  renderBlock,
  renderPlaceholder
} from '../../Editor/utils/renderers'
import { staticText } from '../../Editor/utils/keyHandlers'

export const TITLE = 'title'
export const LEAD = 'lead'
export const CREDITS = 'credits'
export const TITLE_BLOCK = 'titleBlock'

export const TITLE_BLOCK_ZONE = 'TITLE'

export const TitleRule = {
  matchMdast: isHeading(1),
  match: isBlock(TITLE),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: TITLE,
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'heading',
      depth: 1,
      children: visitChildren(node)
    }
  },
  newNode() {
    return {
      object: 'block',
      type: TITLE
    }
  }
}

export const LeadRule = {
  matchMdast: isParagraph,
  match: isBlock(LEAD),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: LEAD,
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
      type: LEAD
    }
  }
}

export const CreditsRule = {
  matchMdast: isParagraph,
  match: isBlock(CREDITS),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: CREDITS,
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
      type: CREDITS
    }
  }
}

export const getTitleBlockNodes = getExactNodes(
  matchOrNew(TitleRule),
  matchOrSkip(LeadRule),
  matchOrNew(CreditsRule)
)

export const TitleBlockRule = {
  matchMdast: isZone(TITLE_BLOCK_ZONE),
  match: isBlock(TITLE_BLOCK),
  fromMdast(node, index, parent, rest) {
    return {
      object: 'block',
      type: TITLE_BLOCK,
      data: node.data,
      nodes: getTitleBlockNodes(node, index, parent, rest)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: TITLE_BLOCK_ZONE,
      data: node.data,
      nodes: visitChildren(node)
    }
  }
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
  onKeyDown: staticText({
    type: TITLE,
    enforceNext: LEAD,
    enforceNextIn: TITLE_BLOCK
  }),
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
  onKeyDown: staticText({
    type: LEAD
  }),
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
  onKeyDown: staticText({
    type: CREDITS
  }),
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
