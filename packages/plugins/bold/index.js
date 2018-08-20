import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark,
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(
      isMark('bold'),
      safeProp('mark')
    ),
    ({ children, attributes }) => {
      return (
        <Editorial.Emphasis {...attributes}>
          {children}
        </Editorial.Emphasis>
      )
    },
    always(undefined)
  ),
}
