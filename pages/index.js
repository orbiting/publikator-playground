import React from 'react'
import Serializer from 'slate-mdast-serializer'

import Editor from '../components/Editor'
import {
  plugins,
  rules
} from '../components/Templates/article'

const serializer = new Serializer({ rules })

export default () => (
  <Editor
    plugins={plugins}
    onChange={v => console.log(serializer.serialize(v))}
  />
)
