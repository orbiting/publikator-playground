import { Figure } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'
import { css } from 'glamor'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  DefaultSizeButton,
  BreakoutSizeButton,
  EdgeToEdgeSizeButton
} from '../common/ui'

const styles = {
  edgeToEdge: css({
    width: '100vw',
    marginLeft: '-15px',
    [`@media only screen and (min-width: 665px)`]: {
      marginLeft: `calc(-100vw / 2 + 665px / 2)`,
      marginRight: `calc(-100vw / 2 + 665px / 2)`
    }
  })
}

export default ifElse(
  compose(
    isBlock('figure'),
    safeProp('node')
  ),
  ({ node, attributes, children, editor }) => [
    <SelectionPath.Options
      key="ui"
      node={node}
      offset={2}
    >
      <SelectionPath.OptionGroup label="Bildgrösse">
        <DefaultSizeButton
          node={node}
          editor={editor}
        />
        <BreakoutSizeButton
          node={node}
          editor={editor}
        />
        <EdgeToEdgeSizeButton
          node={node}
          editor={editor}
        />
      </SelectionPath.OptionGroup>
    </SelectionPath.Options>,
    node.data.get('size') === 'edgeToEdge' ? (
      <div {...styles.edgeToEdge}>
        <Figure
          {...attributes}
          size={node.data.get('size')}
          key="content"
        >
          {children}
        </Figure>
      </div>
    ) : (
      <Figure
        {...attributes}
        size={node.data.get('size')}
        key="content"
      >
        {children}
      </Figure>
    )
  ],
  always(undefined)
)
