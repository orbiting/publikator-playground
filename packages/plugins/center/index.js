import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'
import { ifElse, always, compose } from 'ramda'
import {
  isBlock,
  safeProp,
} from '@orbiting/publikator-editor/lib'

export default {
  renderNode: ifElse(
    compose(
      isBlock('center'),
      safeProp('node')
    ),
    ({ attributes, children }) => (
      <SchemaComponent
        name="center"
        {...attributes}
      >
        {children}
      </SchemaComponent>
    ),
    always(undefined)
  ),
}
