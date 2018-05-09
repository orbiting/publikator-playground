import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '../../../Editor/utils/foo'

export default {
  renderNode: ifElse(
    compose(isMark('sub'), safeProp('node')),
    ({ children, attributes }) => (
      <Editorial.Sub {...attributes}>
        {children}
      </Editorial.Sub>
    ),
    always(undefined)
  )
}
