import dynamic from 'next/dynamic'
import React from 'react'
import { Value } from 'slate'

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
          template: import('@orbiting/publikator-templates/article'),
          createEditorSchema: import('@orbiting/publikator-templates/article/schema'),
          createRenderSchema: import('@project-r/styleguide/lib/templates/Article'),
        }
    }
  },
  ssr: false,
  render: (
    { mdastDocument, children },
    {
      template,
      createEditorSchema,
      createRenderSchema,
    }
  ) => {
    const { deserialize, plugins } = template
    const renderSchema = createRenderSchema()
    const editorSchema = createEditorSchema(
      renderSchema
    )

    return children({
      plugins,
      schema: editorSchema,
      initialValue: Value.fromJSON({
        document: deserialize(mdastDocument),
      }),
    })
  },
})

export default props => <Template {...props} />
