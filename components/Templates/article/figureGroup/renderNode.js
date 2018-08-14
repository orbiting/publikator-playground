import { FigureGroup } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import { InsertGroupedFigureButton } from '../groupedFigure/ui'

import {
  SizeButton,
  DefaultIcon,
  BreakoutIcon
} from '../common/breakouts.js'

export default ifElse(
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
        <SelectionPath.OptionGroup
          primary
          label="Bildergruppe"
        >
          <SizeButton
            name={null}
            node={node}
            editor={editor}
          >
            <DefaultIcon />
          </SizeButton>
          <SizeButton
            name={'breakout'}
            node={node}
            editor={editor}
          >
            <BreakoutIcon />
          </SizeButton>
        </SelectionPath.OptionGroup>
        <SelectionPath.OptionGroup label="Bild einfügen">
          <InsertGroupedFigureButton
            node={node.nodes.last()}
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
