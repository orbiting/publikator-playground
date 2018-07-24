import { FigureGroup } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  DefaultSizeButton,
  BreakoutSizeButton
} from '../common/ui'

export default {
  renderNode: ifElse(
    compose(
      isBlock('figureGroup'),
      safeProp('node')
    ),
    ({ children, attributes, node, editor }) => {
      return [
        <SelectionPath.Options
          offset={3}
          key="ui"
          node={node}
        >
          <SelectionPath.OptionGroup label="Bildergruppe">
            <DefaultSizeButton
              node={node}
              editor={editor}
            />
            <BreakoutSizeButton
              node={node}
              editor={editor}
            />
          </SelectionPath.OptionGroup>
        </SelectionPath.Options>,
        <FigureGroup
          key="content"
          size={node.data.get('size')}
          columns={node.data.get('columns')}
          {...attributes}
        >
          {children}
        </FigureGroup>
      ]
    },
    always(undefined)
  )
}
