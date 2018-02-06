import React from 'react'
import Serializer from 'slate-mdast-serializer'
import Editor from '../components/Editor'

import initial from './kitchensink'

import {
  plugins,
  rules
} from '../components/Templates/article'

const serializer = new Serializer({ rules })

export default () => (
  <Editor
    plugins={plugins}
    value={serializer.deserialize(initial)}
  />
)
