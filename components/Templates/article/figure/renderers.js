import {
  FigureImage,
  Figure
} from '@project-r/styleguide'
import ImageIcon from 'react-icons/lib/fa/image'

import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '../../../Editor/utils/foo'

import buttonStyles from '../../../Editor/styles/buttonStyles'

import PropertyForm from '../../../Editor/components/PropertyForm'
import ImageInput from '../../../Editor/components/ImageInput'

import withNodeData from '../../../Editor/hoc/withNodeData'

const SelectImageButton = withNodeData('url')(
  ImageInput
)

export const renderNode = compose(
  ifElse(
    compose(
      isBlock('figureImage'),
      safeProp('node')
    ),
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
  ifElse(
    compose(isBlock('figure'), safeProp('node')),
    ({ node, attributes, children }) => [
      <PropertyForm
        key="ui"
        node={node}
        offset={2}
      >
        {' '}
      </PropertyForm>,
      <Figure {...attributes} key="content">
        {children}
      </Figure>
    ]
  )
)(always(undefined))
