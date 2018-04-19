import React from 'react'
import { Value } from 'slate'
import Editor from '../components/Editor'

import initial from './usa'

import { plugins } from '../components/Templates/article'
import Article from '../lib/rules'
import { deserialize } from '../lib/serializer'

export default () => (
  <Editor
    plugins={plugins}
    value={Value.fromJSON({
      document: deserialize(
        Article.fromMdast,
        initial
      )
    })}
  />
)
