import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(isMark('italic'), safeProp('mark')),
    ({ children, attributes }) => (
      <Editorial.Cursive {...attributes}>
        {children}
      </Editorial.Cursive>
    ),
    always(undefined)
  )
}
