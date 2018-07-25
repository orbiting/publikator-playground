import { Figure } from '@project-r/styleguide'
import { compose, always, ifElse } from 'ramda'
import { css } from 'glamor'

import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import {
  SizeButton,
  BreakoutIcon,
  DefaultIcon,
  EdgeToEdgeIcon
} from '../common/sizes'

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
        <SizeButton
          name={'edgeToEdge'}
          node={node}
          editor={editor}
        >
          <EdgeToEdgeIcon />
        </SizeButton>
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
