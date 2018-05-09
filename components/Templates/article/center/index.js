import { Center } from '@project-r/styleguide'
import { ifElse, always, compose } from 'ramda'
import {
  isBlock,
  safeProp
} from '../../../Editor/lib'

export default {
  renderNode: ifElse(
    compose(isBlock('center'), safeProp('node')),
    ({ attributes, children }) => (
      <Center {...attributes}>{children}</Center>
    ),
    always(undefined)
  )
}
