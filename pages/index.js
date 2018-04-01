import React from 'react'
import { Value } from 'slate'
import { create as createDeserialize } from '../lib/transforms/mdastToSlate'
import Editor from '../components/Editor'

import initial from './usa'

import {
  plugins,
  rules
} from '../components/Templates/Article'

const deserialize = createDeserialize(
  rules.map(r => r.fromMdast)
)

export default () => (
  <Editor
    plugins={plugins}
    value={Value.fromJSON({
      document: deserialize(initial)
    })}
  />
)
