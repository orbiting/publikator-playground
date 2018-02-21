import { Block } from 'slate'
import { FigureImage, Figure } from '@project-r/styleguide'
import ImageIcon from 'react-icons/lib/fa/image'

import { renderBlock } from '../../../Editor/utils/renderers'
import { blockSchema } from '../../../Editor/utils/schema'
import {
  removeImage,
  removeEmpty
} from '../../../Editor/utils/keyHandlers'

import buttonStyles from '../../../Editor/styles/buttonStyles'

import PropertyForm from '../../../Editor/components/PropertyForm'
import ImageInput from '../../../Editor/components/ImageInput'
import InsertBlockButton from '../../../Editor/components/InsertBlockButton'

import withNodeData from '../../../Editor/hoc/withNodeData'

import { newCaption } from '../caption/plugins'

import { FIGURE, FIGURE_IMAGE } from './constants'

const SelectImageButton = withNodeData('url')(ImageInput)

export const newFigure = () =>
  Block.create({
    type: FIGURE,
    nodes: [
      Block.create({
        type: FIGURE_IMAGE,
        isVoid: true,
        data: {
          url: '',
          title: '',
          alt: ''
        }
      }),
      newCaption()
    ]
  })

export const InsertFigureButton = props => (
  <InsertBlockButton
    block={newFigure}
    {...props}
    {...buttonStyles.iconButton}
  >
    <ImageIcon />
  </InsertBlockButton>
)

export const ImagePlugin = {
  renderNode: renderBlock(
    FIGURE_IMAGE,
    ({ node, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <SelectImageButton
          node={node}
          editor={editor}
          {...buttonStyles.iconButton}
        >
          <ImageIcon />
        </SelectImageButton>
      </PropertyForm>,
      !!node.data.get('url') ? (
        <FigureImage
          key="content"
          src={node.data.get('url')}
          title={node.data.get('title')}
          title={node.data.get('alt')}
          {...attributes}
        />
      ) : (
        <SelectImageButton
          key="content"
          node={node}
          editor={editor}
        >
          <FigureImage
            src="static/images/placeholder.png"
            {...attributes}
          />
        </SelectImageButton>
      )
    ]
  ),
  schema: blockSchema(FIGURE_IMAGE, {
    isVoid: true
  }),
  onKeyDown: removeImage({ type: FIGURE_IMAGE })
}

export const FigurePlugin = {
  renderNode: renderBlock(
    FIGURE,
    ({ node, attributes, children }) => [
      <PropertyForm key="ui" node={node} offset={2}>
        {' '}
      </PropertyForm>,
      <Figure {...attributes} key="content">
        {children}
      </Figure>
    ]
  ),
  schema: blockSchema('figure', {
    nodes: [
      { types: ['image'], min: 1, max: 1 },
      { types: ['caption'], min: 1, max: 1 }
    ]
  }),
  onKeyDown: removeEmpty({
    type: 'figure',
    isEmpty: n =>
      !n.text.trim() && !n.nodes.first().data.get('url')
  })
}
