import { FigureImage } from '@project-r/styleguide'
import ChangeImageIcon from 'react-icons/lib/fa/exchange'

import { compose, ifElse, always } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import ImageInput from '@orbiting/publikator-editor/components/ImageInput'

import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'

const SelectImageButton = withNodeData('url')(
  ImageInput
)

export default ifElse(
  compose(
    isBlock('figureImage'),
    safeProp('node')
  ),
  ({ node, attributes, editor }) => [
    <SelectionPath.Options key="ui" node={node}>
      <SelectionPath.OptionGroup label="Bild">
        <SelectImageButton
          node={node}
          editor={editor}
          {...buttonStyles.iconButton}
        >
          <ChangeImageIcon size={22} />
        </SelectImageButton>
      </SelectionPath.OptionGroup>
    </SelectionPath.Options>,
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
  ],
  always(undefined)
)
