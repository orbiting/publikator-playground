import React from 'react'
import { Value } from 'slate'
import Editor from '../components/Editor'
import { parse } from '@orbiting/remark-preset'
import initial from './usa'

import plugins from '../components/Templates/article/plugins'
import Article from '../lib/rules'
import { deserialize } from '../lib/serializer'

export default () => (
  <Editor
    plugins={plugins}
    initialValue={Value.fromJSON({
      document: deserialize(
        Article.fromMdast,
        parse(initial)
      )
    })}
  />
)
