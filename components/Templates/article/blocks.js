import { Editorial } from '@project-r/styleguide'
import ParagraphIcon from 'react-icons/lib/fa/paragraph'
import SubheadIcon from 'react-icons/lib/fa/header'

import { isBlock, when } from '../../Editor/utils'
import { renderBlock } from '../../Editor/utils/renderers'
import {
  isParagraph,
  isHeading
} from '../../Editor/utils/mdast'
import buttonStyles from '../../Editor/styles/buttonStyles'
import PropertyForm from '../../Editor/components/PropertyForm'
import FormatBlockButton from '../../Editor/components/FormatBlockButton'

import { BoldButton, SupButton, SubButton } from './marks'
import { LinkButton } from './link'
import { InsertFigureButton } from './figure/plugins'
import { InsertInfoBoxButton } from './infoBox/plugins'

export const PARAGRAPH = 'paragraph'
export const SUBHEAD = 'subhead'

export const ParagraphButton = props => (
  <FormatBlockButton
    block={PARAGRAPH}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ParagraphIcon />
  </FormatBlockButton>
)

const SubheadButton = props => (
  <FormatBlockButton
    block={SUBHEAD}
    {...props}
    {...buttonStyles.iconButton}
  >
    <SubheadIcon />
  </FormatBlockButton>
)

const BlockButtons = ({ node, editor }) => (
  <span>
    <InsertFigureButton node={node} editor={editor} />
    <InsertInfoBoxButton node={node} editor={editor} />
    <ParagraphButton node={node} editor={editor} />
    <SubheadButton node={node} editor={editor} />
    <BoldButton editor={editor} />
    <SupButton editor={editor} />
    <SubButton editor={editor} />
    <LinkButton editor={editor} />
  </span>
)

export const ParagraphRule = {
  fromMdast: when(isParagraph, (node, next) => ({
    object: 'block',
    type: PARAGRAPH,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(PARAGRAPH), (node, next) => ({
    type: 'paragraph',
    children: next(node.nodes)
  }))
}

export const SubheadRule = {
  fromMdast: when(isHeading(2), (node, next) => ({
    object: 'block',
    type: SUBHEAD,
    nodes: next(node.children)
  })),
  toMdast: when(isBlock(SUBHEAD), (node, next) => ({
    type: 'heading',
    depth: 2,
    children: next(node.nodes)
  }))
}

export const ParagraphPlugin = {
  renderNode: renderBlock(
    PARAGRAPH,
    ({ node, children, attributes, editor }) => [
      <PropertyForm offset={1} key="ui" node={node}>
        <BlockButtons node={node} editor={editor} />
      </PropertyForm>,
      <Editorial.P key="content" {...attributes}>
        {children}
      </Editorial.P>
    ]
  )
}

export const SubheadPlugin = {
  renderNode: renderBlock(
    SUBHEAD,
    ({ node, children, attributes, editor }) => [
      <PropertyForm offset={1} key="ui" node={node}>
        <BlockButtons node={node} editor={editor} />
      </PropertyForm>,
      <Editorial.Subhead key="content" {...attributes}>
        {children}
      </Editorial.Subhead>
    ]
  )
}
