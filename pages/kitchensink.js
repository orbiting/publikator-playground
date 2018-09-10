import dynamic from 'next/dynamic'
import React from 'react'
import { Value } from 'slate'
import { parse } from '@orbiting/remark-preset'
import Editor from '@orbiting/publikator-editor'
import EditorUI from '@orbiting/publikator-editor/components/UI'
import initial from './usa'

import { deserialize } from '../lib/serializer'
import withAuthorization from '../components/Auth/withAuthorization'

const Template = dynamic({
  modules: ({ mdastDocument }) => {
    const template =
      (mdastDocument &&
        mdastDocument.meta &&
        mdastDocument.meta.template) ||
      'article'

    switch (template) {
      case 'article':
        return {
          plugins: import('@orbiting/publikator-templates/article/plugins'),
          DocumentRule: import('@orbiting/publikator-templates/article/rule'),
          createEditorSchema: import('@orbiting/publikator-templates/article/schema'),
          createRenderSchema: import('@project-r/styleguide/lib/templates/Article'),
        }
    }
  },
  ssr: false,
  render: (
    { mdastDocument },
    {
      plugins,
      DocumentRule,
      createEditorSchema,
      createRenderSchema,
    }
  ) => {
    const renderSchema = createRenderSchema()
    const editorSchema = createEditorSchema(
      renderSchema
    )

    return (
      <div>
        <EditorUI />
        <Editor
          schema={editorSchema}
          plugins={plugins}
          initialValue={Value.fromJSON({
            document: deserialize(
              DocumentRule.fromMdast,
              mdastDocument
            ),
          })}
        />
      </div>
    )
  },
})

export default withAuthorization(['editor'])(
  () => (
    <Template mdastDocument={parse(initial)} />
  )
)
