import {
  InfoBox,
  InfoBoxTitle,
  InfoBoxText
} from '@project-r/styleguide'
import { Block } from 'slate'
import InfoBoxIcon from 'react-icons/lib/fa/info'

import {
  returnFirst,
  isBlock
} from '../../../Editor/utils'
import {
  renderBlock,
  renderPlaceholder,
  withRelativeStyle
} from '../../../Editor/utils/renderers'
import { blockSchema } from '../../../Editor/utils/schema'

import {
  softBreak,
  removeEmpty
} from '../../../Editor/utils/keyHandlers'

import {
  preventSplit,
  preventForwardMerge,
  preventBackwardMerge
} from '../../../Editor/utils/keyDown'

import buttonStyles from '../../../Editor/styles/buttonStyles'
import PropertyForm from '../../../Editor/components/PropertyForm'
import InsertBlockButton from '../../../Editor/components/InsertBlockButton'

import { BoldButton } from '../marks'
import { LinkButton } from '../link'

import {
  INFOBOX,
  INFOBOX_TITLE,
  INFOBOX_TEXT
} from './constants'

export const newInfobox = () =>
  Block.create({
    type: INFOBOX,
    nodes: [
      Block.create({
        type: INFOBOX_TITLE
      }),
      Block.create({
        type: INFOBOX_TEXT
      })
    ]
  })

export const InsertInfoBoxButton = props => (
  <InsertBlockButton
    block={newInfobox}
    {...props}
    {...buttonStyles.iconButton}
  >
    <InfoBoxIcon />
  </InsertBlockButton>
)

export const InfoboxTitlePlugin = {
  renderNode: renderBlock(
    INFOBOX_TITLE,
    ({ children, attributes }) => (
      <InfoBoxTitle
        attributes={withRelativeStyle(attributes)}
      >
        {children}
      </InfoBoxTitle>
    )
  ),
  schema: blockSchema(INFOBOX_TITLE, {
    nodes: [{ objects: ['text'] }],
    parent: {
      types: [INFOBOX]
    }
  }),
  // onKeyDown: returnFirst(
  //   preventSplit(isBlock(INFOBOX_TITLE)),
  //   preventBackwardMerge(isBlock(INFOBOX_TITLE)),
  //   preventForwardMerge(isBlock(INFOBOX_TITLE))
  // ),
  renderPlaceholder: renderPlaceholder(
    INFOBOX_TITLE,
    'Infobox'
  )
}

export const InfoboxTextPlugin = {
  renderNode: renderBlock(
    INFOBOX_TEXT,
    ({ node, children, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <BoldButton editor={editor} />
        <LinkButton editor={editor} />
      </PropertyForm>,
      <InfoBoxText
        key="content"
        attributes={withRelativeStyle(attributes)}
      >
        {children}
      </InfoBoxText>
    ]
  ),
  schema: blockSchema(INFOBOX_TEXT, {
    nodes: [{ objects: ['text'] }],
    parent: {
      types: [INFOBOX]
    }
  }),
  // onKeyDown: returnFirst(
  //   softBreak({
  //     type: INFOBOX_TEXT
  //   }),
  //   preventSplit(isBlock(INFOBOX_TEXT)),
  //   preventBackwardMerge(isBlock(INFOBOX_TEXT)),
  //   preventForwardMerge(isBlock(INFOBOX_TEXT))
  // ),
  renderPlaceholder: renderPlaceholder(
    INFOBOX_TEXT,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in aliquet lacus, nec semper libero.'
  )
}

export const InfoboxPlugin = {
  renderNode: renderBlock(
    INFOBOX,
    ({ node, children, attributes }) => [
      <PropertyForm
        key="ui"
        node={node}
        offset={2}
      >
        Hello
      </PropertyForm>,
      <InfoBox
        key="content"
        attributes={attributes}
      >
        {children}
      </InfoBox>
    ]
  ),
  schema: blockSchema(INFOBOX, {
    nodes: [
      { types: [INFOBOX_TITLE], min: 1, max: 1 },
      { types: [INFOBOX_TEXT], min: 1, max: 1 }
    ]
  })
  // onKeyDown: returnFirst(
  //   removeEmpty({
  //     type: INFOBOX,
  //     isEmpty: node => !node.text.trim()
  //   })
  // )
}
