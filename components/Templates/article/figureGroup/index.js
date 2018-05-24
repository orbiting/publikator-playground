import { FigureGroup } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '../../../Editor/lib'
import SelectionPath from '../../../Editor/components/SelectionPath'

export default {
  renderNode: ifElse(
    compose(
      isBlock('figureGroup'),
      safeProp('node')
    ),
    ({ children, attributes, node }) => {
      return [
        <SelectionPath.Options
          key="ui"
          node={node}
        >
          foo
        </SelectionPath.Options>,
        <FigureGroup
          key="content"
          {...attributes}
        >
          {children}
        </FigureGroup>
      ]
    },
    always(undefined)
  )
}
