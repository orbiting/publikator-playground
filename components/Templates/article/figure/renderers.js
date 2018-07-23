import { Figure } from '@project-r/styleguide'

import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

export const renderNode = ifElse(
  compose(
    isBlock('figure'),
    safeProp('node')
  ),
  ({ node, attributes, children }) => [
    <SelectionPath.Options
      key="ui"
      node={node}
      offset={2}
    >
      {' '}
    </SelectionPath.Options>,
    <Figure {...attributes} key="content">
      {children}
    </Figure>
  ],
  always(undefined)
)
