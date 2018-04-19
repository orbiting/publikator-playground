import {
  Editorial,
  TitleBlock
} from '@project-r/styleguide'

import {
  isBlock,
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
  renderPlaceholder: renderPlaceholder(
    TITLE,
    'Title'
  )
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
  renderPlaceholder: renderPlaceholder(
    LEAD,
    'Lead'
  )
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
      <TitleBlock {...attributes}>
        {children}
      </TitleBlock>
    )
  )
}

export default {
  plugins: [
    TitleBlockPlugin,
    TitlePlugin,
    LeadPlugin,
    CreditsPlugin
  ]
}
