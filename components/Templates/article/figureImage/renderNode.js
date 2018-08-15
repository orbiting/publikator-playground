import React, { Fragment } from 'react'
import { compose, ifElse, always } from 'ramda'
import { FigureImage } from '@project-r/styleguide'
import {
  safeProp,
  isBlock,
} from '@orbiting/publikator-editor/lib'

import {
  FigureImageUI,
  SelectImageButton,
} from './ui'

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
