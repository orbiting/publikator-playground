import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark,
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(
      isMark('italic'),
      safeProp('mark')
    ),
    ({ children, attributes }) => (
      <SchemaComponent
        name="italic"
        {...attributes}
      >
        {children}
      </SchemaComponent>
    ),
    always(undefined)
  ),
}
