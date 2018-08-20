import React from 'react'
import { Value } from 'slate'
import Editor from '@orbiting/publikator-editor'
import { parse } from '@orbiting/remark-preset'
import initial from './usa'

import plugins from '@orbiting/publikator-templates/article/plugins'
import Article from '../lib/transformers'
import { deserialize } from '../lib/serializer'

export default () => (
  <Editor
    plugins={plugins}
    initialValue={Value.fromJSON({
      document: deserialize(
        Article.fromMdast,
        parse(initial)
      ),
    })}
  />
)
