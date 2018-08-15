import React, { Fragment } from 'react'
import { compose, ifElse, always } from 'ramda'

import {
  InfoBox,
  InfoBoxTitle,
  InfoBoxText
} from '@project-r/styleguide'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import {
  InfoBoxUI,
  InfoBoxTitleUI,
  InfoBoxTextUI
} from './ui'

export default compose(
  ifElse(
    compose(
      isBlock('infoBox'),
      safeProp('node')
    ),
    ({ children, attributes, node, editor }) => {
      return (
        <Fragment>
          <InfoBoxUI
            key="ui"
            node={node}
            editor={editor}
          />
          <InfoBox
            key="content"
            attributes={attributes}
            size={node.data.get('size')}
            figureSize={node.data.get(
              'figureSize'
            )}
          >
            {children}
          </InfoBox>
        </Fragment>
      )
    }
  ),
  ifElse(
    compose(
      isBlock('infoBoxTitle'),
      safeProp('node')
    ),
    ({ node, editor, children, attributes }) => (
      <Fragment>
        <InfoBoxTitleUI
          key="ui"
          node={node}
          editor={editor}
        />
        <InfoBoxTitle
          key="content"
          attributes={{
            ...attributes,
            style: { position: 'relative' }
          }}
        >
          {children}
        </InfoBoxTitle>
      </Fragment>
    )
  ),
  ifElse(
    compose(
      isBlock('infoBoxText'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => (
      <Fragment>
        <InfoBoxTextUI
          key="ui"
          node={node}
          editor={editor}
        />
        <InfoBoxText
          key="content"
          attributes={{
            ...attributes,
            style: { position: 'relative' }
          }}
        >
          {children}
        </InfoBoxText>
      </Fragment>
    )
  )
)(always(undefined))
