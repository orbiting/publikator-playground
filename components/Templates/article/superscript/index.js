import { Editorial } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '../../../Editor/lib'

export default {
  renderNode: ifElse(
    compose(isMark('sup'), safeProp('node')),
    ({ children, attributes }) => (
      <Editorial.Sup {...attributes}>
        {children}
      </Editorial.Sup>
    ),
    always(undefined)
  )
}
