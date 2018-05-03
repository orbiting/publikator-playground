import { Block } from 'slate'
import {
  FigureCaption,
  FigureByline
} from '@project-r/styleguide'

import { returnFirst } from '../../../Editor/utils'
import {
  renderBlock,
  renderInlinePlaceholder
} from '../../../Editor/utils/renderers'

import PropertyForm from '../../../Editor/components/PropertyForm'

import onKeyDown from './onKeyDown'

import {
  CAPTION,
  CAPTION_TEXT,
  CAPTION_BYLINE
} from './constants'

import { BoldButton } from '../marks'
import { LinkButton } from '../link'

export const newCaption = () =>
  Block.create({
    type: CAPTION,
    nodes: [
      Block.create({
        type: CAPTION_TEXT
      }),
      Block.create({
        type: CAPTION_BYLINE
      })
    ]
  })

export const CaptionPlugin = {
  renderNode: returnFirst(
    renderBlock(
      CAPTION,
      ({ node, children, attributes }) => [
        <PropertyForm key="ui" node={node}>
          Caption
        </PropertyForm>,
        <FigureCaption
          key="content"
          {...attributes}
        >
          {children}
        </FigureCaption>
      ]
    ),
    renderBlock(
      CAPTION_TEXT,
      ({
        node,
        children,
        attributes,
        editor
      }) => [
        <PropertyForm
          key="ui"
          node={node}
          offset={1}
        >
          <BoldButton editor={editor} />
          <LinkButton editor={editor} />
        </PropertyForm>,
        <span key="content" {...attributes}>
          {children}
        </span>
      ]
    ),
    renderBlock(
      CAPTION_BYLINE,
      ({
        node,
        children,
        attributes,
        editor
      }) => [
        <PropertyForm
          key="ui"
          node={node}
          offset={1}
        >
          <LinkButton editor={editor} />
        </PropertyForm>,
        <FigureByline
          key="content"
          {...attributes}
        >
          {children}
        </FigureByline>
      ]
    )
  ),
  onKeyDown,
  renderPlaceholder: returnFirst(
    renderInlinePlaceholder(
      CAPTION_TEXT,
      'Legende'
    ),
    renderInlinePlaceholder(
      CAPTION_BYLINE,
      ' Credits'
    )
  )
}
