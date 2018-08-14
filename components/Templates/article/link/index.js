import { Editorial } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline
} from '@orbiting/publikator-editor/lib'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import { LinkUI } from './ui'

export default {
  renderNode: ifElse(
    compose(
      isInline('link'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => [
      <SelectionPath.Options key="ui" node={node}>
        <LinkUI
          node={node}
          editor={editor}
          focusRef={editor}
        />
      </SelectionPath.Options>,
      <Editorial.A
        key="content"
        href={node.data.get('url')}
        title={node.data.get('title')}
        {...attributes}
      >
        {children}
      </Editorial.A>
    ],
    always(undefined)
  )
}
