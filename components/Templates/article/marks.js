import { Editorial, Sub, Sup } from '@project-r/styleguide'
import BoldIcon from 'react-icons/lib/fa/bold'
import SupIcon from 'react-icons/lib/fa/superscript'
import SubIcon from 'react-icons/lib/fa/subscript'

import buttonStyles from '../../Editor/styles/buttonStyles'
import { isMark, returnFirst } from '../../Editor/utils'
import { renderMark } from '../../Editor/utils/renderers'
import { isOfType } from '../../Editor/utils/mdast'
import MarkButton from '../../Editor/components/MarkButton'

/**
 * Names
 */
export const BOLD = 'bold'
export const SUP = 'sup'
export const SUB = 'sub'

/**
 * UI
 */
export const BoldButton = props => (
  <MarkButton
    mark={BOLD}
    {...props}
    {...buttonStyles.iconButton}
  >
    <BoldIcon />
  </MarkButton>
)

export const SupButton = props => (
  <MarkButton
    mark={SUP}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SupIcon />
  </MarkButton>
)

export const SubButton = props => (
  <MarkButton
    mark={SUB}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubIcon />
  </MarkButton>
)

export const BoldRule = {
  match: isMark(BOLD),
  matchMdast: isOfType('strong'),
  fromMdast: (node, index, parent, { visitChildren }) => ({
    kind: 'mark',
    type: BOLD,
    nodes: visitChildren(node)
  }),
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'strong',
    children: visitChildren(mark)
  })
}

export const SuperscriptRule = {
  match: isMark(SUP),
  matchMdast: isOfType('sup'),
  fromMdast: (node, index, parent, { visitChildren }) => ({
    kind: 'mark',
    type: SUP,
    nodes: visitChildren(node)
  }),
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'sup',
    children: visitChildren(mark)
  })
}

export const SubscriptRule = {
  match: isMark(SUB),
  matchMdast: isOfType('sub'),
  fromMdast: (node, index, parent, { visitChildren }) => ({
    kind: 'mark',
    type: SUB,
    nodes: visitChildren(node)
  }),
  toMdast: (mark, index, parent, { visitChildren }) => ({
    type: 'sub',
    children: visitChildren(mark)
  })
}

export const MarksPlugin = {
  renderMark: returnFirst(
    renderMark(BOLD, ({ children, attributes }) => (
      <Editorial.Emphasis {...attributes}>
        {children}
      </Editorial.Emphasis>
    )),
    renderMark(SUP, ({ children, attributes }) => (
      <Sup {...attributes}>{children}</Sup>
    )),
    renderMark(SUB, ({ children, attributes }) => (
      <Sub {...attributes}>{children}</Sub>
    ))
  )
}
