import { SchemaComponent } from '@orbiting/publikator-editor/components/Schema'

import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isMark,
} from '@orbiting/publikator-editor/lib'

export default {
  renderMark: ifElse(
    compose(
      isMark('bold'),
      safeProp('mark')
    ),
    ({ children, attributes }) => {
      return (
        <SchemaComponent
          name="bold"
          {...attributes}
        >
          {children}
        </SchemaComponent>
      )
    },
    always(undefined)
  ),
}
