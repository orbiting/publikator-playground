import React from 'react'
import { Value } from 'slate'
import Editor from '@orbiting/publikator-editor'
import { parse } from '@orbiting/remark-preset'
import initial from './usa'

import plugins from '@orbiting/publikator-templates/article/plugins'
import Rule from '@orbiting/publikator-templates/article/rules'
import { deserialize } from '../lib/serializer'

export default () => (
  <Editor
    plugins={plugins}
    initialValue={Value.fromJSON({
      document: deserialize(
        Rule.fromMdast,
        parse(initial)
      ),
    })}
  />
)
