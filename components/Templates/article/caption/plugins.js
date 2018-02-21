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
import { blockSchema } from '../../../Editor/utils/schema'
import { staticText } from '../../../Editor/utils/keyHandlers'

import PropertyForm from '../../../Editor/components/PropertyForm'

import {
  CAPTION,
  CAPTION_TEXT,
  CAPTION_BYLINE
} from './constants'

import { PARAGRAPH } from '../blocks'

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
        <FigureCaption key="content" {...attributes}>
          {children}
        </FigureCaption>
      ]
    ),
    renderBlock(
      CAPTION_TEXT,
      ({ node, children, attributes, editor }) => [
        <PropertyForm key="ui" node={node} offset={1}>
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
      ({ node, children, attributes, editor }) => [
        <PropertyForm key="ui" node={node} offset={1}>
          <LinkButton editor={editor} />
        </PropertyForm>,
        <FigureByline key="content" {...attributes}>
          {children}
        </FigureByline>
      ]
    )
  ),
  onKeyDown: returnFirst(
    staticText({
      type: CAPTION_BYLINE,
      enforceNext: PARAGRAPH
    }),
    staticText({
      type: CAPTION_TEXT
    })
  ),
  renderPlaceholder: returnFirst(
    renderInlinePlaceholder(CAPTION_TEXT, 'Legende'),
    renderInlinePlaceholder(CAPTION_BYLINE, ' Credits')
  ),
  schema: blockSchema(CAPTION, {
    nodes: [
      { types: [CAPTION_TEXT], min: 1, max: 1 },
      { types: [CAPTION_BYLINE], min: 1, max: 1 }
    ]
  })
}
