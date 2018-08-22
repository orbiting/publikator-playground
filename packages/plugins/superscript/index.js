import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark,
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(
      isMark('sup'),
      safeProp('mark')
    ),
    ({ children, attributes }) => (
      <SchemaComponent name="sup" {...attributes}>
        {children}
      </SchemaComponent>
    ),
    always(undefined)
  ),
}
