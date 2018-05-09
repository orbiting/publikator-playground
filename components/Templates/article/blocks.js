import { Editorial } from '@project-r/styleguide'
import ParagraphIcon from 'react-icons/lib/fa/paragraph'
import SubheadIcon from 'react-icons/lib/fa/header'
import { renderBlock } from '../../Editor/utils/renderers'
import buttonStyles from '../../Editor/styles/buttonStyles'
import PropertyForm from '../../Editor/components/PropertyForm'
import FormatBlockButton from '../../Editor/components/FormatBlockButton'

import { BoldButton } from './bold/ui'
import { SubButton } from './subscript/ui'
import { SupButton } from './superscript/ui'

import { LinkButton } from './link/ui'
import { InsertFigureButton } from './figure/ui'
import { InsertInfoBoxButton } from './infoBox/ui'

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
    <InsertFigureButton
      node={node}
      editor={editor}
    />
    <InsertInfoBoxButton
      node={node}
      editor={editor}
    />
    <ParagraphButton
      node={node}
      editor={editor}
    />
    <SubheadButton node={node} editor={editor} />
    <BoldButton editor={editor} />
    <SupButton editor={editor} />
    <SubButton editor={editor} />
    <LinkButton editor={editor} />
  </span>
)

export const ParagraphPlugin = {
  renderNode: renderBlock(
    PARAGRAPH,
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        offset={1}
        key="ui"
        node={node}
      >
        <BlockButtons
          node={node}
          editor={editor}
        />
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
      <PropertyForm
        offset={1}
        key="ui"
        node={node}
      >
        <BlockButtons
          node={node}
          editor={editor}
        />
      </PropertyForm>,
      <Editorial.Subhead
        key="content"
        {...attributes}
      >
        {children}
      </Editorial.Subhead>
    ]
  )
}
