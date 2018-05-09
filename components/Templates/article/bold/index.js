import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '../../../Editor/lib'

export default {
  renderNode: ifElse(
    compose(isMark('bold'), safeProp('node')),
    ({ children, attributes }) => (
      <Editorial.Emphasis {...attributes}>
        {children}
      </Editorial.Emphasis>
    ),
    always(undefined)
  )
}
