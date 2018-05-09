import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '../../../Editor/utils/foo'

export default {
  renderNode: ifElse(
    compose(isMark('italic'), safeProp('node')),
    ({ children, attributes }) => (
      <Editorial.Italic {...attributes}>
        {children}
      </Editorial.Italic>
    ),
    always(undefined)
  )
}
