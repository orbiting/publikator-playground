import { Editorial, Sub, Sup } from '@project-r/styleguide'
import BoldIcon from 'react-icons/lib/fa/bold'
import SupIcon from 'react-icons/lib/fa/superscript'
import SubIcon from 'react-icons/lib/fa/subscript'

import buttonStyles from '../../Editor/styles/buttonStyles'
import {
  isMark,
  returnFirst,
  when
} from '../../Editor/utils'
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
  fromMdast: when(isOfType('strong'), (node, next) => ({
    object: 'mark',
    type: BOLD,
    nodes: next(node.children)
  })),
  toMdast: when(isMark(BOLD), (node, next) => ({
    type: 'strong',
    children: next(node.nodes)
  }))
}

export const SuperscriptRule = {
  fromMdast: when(isOfType('sup'), (node, next) => ({
    object: 'mark',
    type: SUP,
    nodes: next(node.children)
  })),
  toMdast: when(isMark(SUP), (node, next) => ({
    type: 'sup',
    children: next(node.nodes)
  }))
}

export const SubscriptRule = {
  fromMdast: when(isOfType('sub'), (node, next) => ({
    object: 'mark',
    type: SUB,
    nodes: next(node.children)
  })),
  toMdast: when(isMark(SUB), (node, next) => ({
    type: 'sub',
    children: next(node.nodes)
  }))
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
