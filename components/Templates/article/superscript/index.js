import { Sup } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark
} from '../../../Editor/lib'

export default {
  renderMark: ifElse(
    compose(isMark('sup'), safeProp('mark')),
    ({ children, attributes }) => (
      <Sup {...attributes}>{children}</Sup>
    ),
    always(undefined)
  )
}
