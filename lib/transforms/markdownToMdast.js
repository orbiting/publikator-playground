import unified from 'unified'
import remarkParse from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import meta from './meta'
import zone from './zone'

const parser = unified()
  .use(remarkParse, {
    commonmark: true,
    position: false
  })
  .use(frontmatter, ['yaml'])
  .use(meta.parse)
  .use(zone.collapse, {
    test: ({ type, value }) => {
      if (type !== 'html') {
        return
      }
      if (
        value.match(
          /^\s*<section>\s*<h6>([^<]+)<\/h6>/
        )
      ) {
        return 'start'
      }
      if (
        value.match(
          /^\s*<hr\s*\/>\s*<\/section>\s*/
        )
      ) {
        return 'end'
      }
    },
    mutate: (start, nodes) => {
      let data = {}
      const identifier = start.value
        .match(/<h6>([^<]+)<\/h6>/)[1]
        .trim()
      const dataNode = nodes[0]
      const hasDataNode =
        dataNode &&
        dataNode.type === 'code'
      if (hasDataNode) {
        data = JSON.parse(
          dataNode.value
        )
      }
      return {
        type: 'zone',
        identifier,
        data,
        children: hasDataNode
          ? nodes.slice(1)
          : nodes
      }
    }
  })

export const create = () => markdown =>
  parser.runSync(parser.parse(markdown))

export default create
