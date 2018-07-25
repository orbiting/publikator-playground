import { Figure } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

export default ifElse(
  compose(
    isBlock('groupedFigure'),
    safeProp('node')
  ),
  ({ attributes, children }) => (
    <Figure {...attributes} key="content">
      {children}
    </Figure>
  ),
  always(undefined)
)
