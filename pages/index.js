import dynamic from 'next/dynamic'
import React from 'react'
import { Value } from 'slate'
import { parse } from '@orbiting/remark-preset'
import Editor from '@orbiting/publikator-editor'
import RepoSearch from '@orbiting/publikator-editor/components/RepoSearch'
import initial from './usa'

import { deserialize } from '../lib/serializer'

const Template = dynamic({
  modules: ({ mdastDocument }) => {
    switch (mdastDocument.meta.template) {
      case 'article':
        return {
          plugins: import('@orbiting/publikator-templates/article/plugins'),
          DocumentRule: import('@orbiting/publikator-templates/article/rule'),
          schemaFactory: import('@project-r/styleguide/lib/templates/Article'),
        }
    }
  },
  render: (
    { mdastDocument },
    { plugins, DocumentRule }
  ) => {
    return (
      <div>
        <Editor
          plugins={plugins}
          initialValue={Value.fromJSON({
            document: deserialize(
              DocumentRule.fromMdast,
              mdastDocument
            ),
          })}
        />
        <RepoSearch
          onChange={v => console.log(v)}
        />
      </div>
    )
  },
})

export default () => (
  <Template mdastDocument={parse(initial)} />
)
