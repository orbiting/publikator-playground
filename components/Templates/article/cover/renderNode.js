import { FigureCover } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  SizeButton,
  TinyIcon,
  DefaultIcon,
  EdgeToEdgeIcon
} from '../common/sizes'

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
        <SizeButton
          name="tiny"
          node={node}
          editor={editor}
        >
          <TinyIcon />
        </SizeButton>
        <SizeButton
          name="center"
          node={node}
          editor={editor}
        >
          <DefaultIcon />
        </SizeButton>
        <SizeButton
          name={null}
          node={node}
          editor={editor}
        >
          <EdgeToEdgeIcon />
        </SizeButton>
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
