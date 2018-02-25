import unified from 'unified'
import stringify from 'remark-stringify'
import frontmatter from 'remark-frontmatter'
import meta from './meta'
import zone from './zone'

const printer = unified()
  .use(stringify, {
    bullet: '*',
    fences: true
  })
  .use(frontmatter, ['yaml'])
  .use(meta.format)
  .use(zone.expand, {
    test: ({ type }) => type === 'zone',
    mutate: node => {
      const data = JSON.stringify(
        node.data || {},
        null,
        2
      )
      return [
        {
          type: 'html',
          value: `<section><h6>${node.identifier}</h6>`
        },
        data !== '{}' && {
          type: 'code',
          lang: null,
          value: data
        },
        ...node.children,
        {
          type: 'html',
          value: '<hr /></section>'
        }
      ].filter(Boolean)
    }
  })

export const create = () => mdast =>
  printer.stringify(
    printer.runSync(
      JSON.parse(JSON.stringify(mdast))
    )
  )

export default create
