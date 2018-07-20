import { Sub } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(isMark('sub'), safeProp('mark')),
    ({ children, attributes }) => (
      <Sub {...attributes}>{children}</Sub>
    ),
    always(undefined)
  )
}
