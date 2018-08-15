import React, { Fragment } from 'react'
import { compose, ifElse, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'
import ImageInput from '@orbiting/publikator-editor/components/ImageInput'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'

import { FigureImageUI } from './ui'
import { FigureImage } from '@project-r/styleguide'

const SelectImageButton = withNodeData('url')(
  ImageInput
)

export default ifElse(
  compose(
    isBlock('figureImage'),
    safeProp('node')
  ),
  ({ node, attributes, editor }) => (
    <Fragment>
      <FigureImageUI
        key="ui"
        node={node}
        editor={editor}
      />
      <SelectImageButton
        key="content"
        node={node}
        editor={editor}
      >
        {!!node.data.get('url') ? (
          <FigureImage
            src={node.data.get('url')}
            title={node.data.get('title')}
            title={node.data.get('alt')}
            {...attributes}
          />
        ) : (
          <FigureImage
            src="static/images/placeholder.png"
            {...attributes}
          />
        )}
      </SelectImageButton>
    </Fragment>
  ),
  always(undefined)
)
