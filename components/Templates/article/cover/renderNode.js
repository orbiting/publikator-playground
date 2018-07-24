import { FigureCover } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  TinySizeButton,
  CenterSizeButton,
  EdgeToEdgeSizeButton
} from '../common/ui'

export default ifElse(
  compose(
    isBlock('cover'),
    safeProp('node')
  ),
  ({ node, attributes, children, editor }) => [
    <SelectionPath.Options
      key="ui"
      node={node}
      offset={2}
    >
      <SelectionPath.OptionGroup label="Bildgrösse">
        <TinySizeButton
          node={node}
          editor={editor}
        />
        <CenterSizeButton
          node={node}
          editor={editor}
        />
        <EdgeToEdgeSizeButton
          node={node}
          editor={editor}
        />
      </SelectionPath.OptionGroup>
    </SelectionPath.Options>,
    <FigureCover
      {...attributes}
      size={
        node.data.get('size') === 'edgeToEdge'
          ? undefined
          : node.data.get('size')
      }
      key="content"
    >
      {children}
    </FigureCover>
  ],
  always(undefined)
)
