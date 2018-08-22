import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'

import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark,
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(
      isMark('sub'),
      safeProp('mark')
    ),
    ({ children, attributes }) => (
      <SchemaComponent name="sub" {...attributes}>
        {children}
      </SchemaComponent>
    ),
    always(undefined)
  ),
}
