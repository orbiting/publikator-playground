import { Block } from 'slate'
import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'

import {
  isBlock,
  safeProp
} from '@orbiting/publikator-editor/lib'

import onKeyDown from './onKeyDown'

export default {
  onKeyDown,
  getNew: () =>
    Block.create({
      type: 'listItem'
    }),
  renderNode: ifElse(
    compose(
      isBlock('listItem'),
      safeProp('node')
    ),
    ({ children, attributes }) => (
      <Editorial.LI key="content" {...attributes}>
        {children}
      </Editorial.LI>
    ),
    always(undefined)
  )
}
