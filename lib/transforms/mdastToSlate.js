import typeOf from 'type-of'

const transformNodes = transformers => (elements = []) => {
  let nodes = []

  elements.forEach(element => {
    const node = transformNode(transformers)(element)
    switch (typeOf(node)) {
      case 'array':
        nodes = nodes.concat(node)
        break
      case 'object':
        nodes.push(node)
        break
    }
  })
  return nodes
}

const transformNode = transformers => element => {
  let node

  const next = elements => {
    switch (typeOf(elements)) {
      case 'array':
        return transformNodes(transformers)(elements)
      case 'object':
        return transformNode(transformers)(elements)

      case 'null':
      case 'undefined':
        return
      default:
        throw new Error(
          `MDAST to Slate: The \`next\` argument was called with invalid children "${elements}".`
        )
    }
  }

  for (const transformer of transformers) {
    const ret = transformer(element, next)
    const type = typeOf(ret)

    if (
      type !== 'array' &&
      type !== 'object' &&
      type !== 'null' &&
      type !== 'undefined'
    ) {
      throw new Error(
        `MDAST to Slate: A transformer returned an invalid representation "${node}".`
      )
    }

    if (ret === undefined) {
      continue
    } else if (ret === null) {
      return null
    } else if (ret.object === 'mark') {
      node = transformMark(ret)
    } else {
      node = ret
    }

    break
  }

  if (!node) {
    throw new Error(
      `MDAST to Slate: No transformer found for MDAST node of type "${
        element.type
      }"`
    )
  }

  return node || next(element.children)
}

const transformMark = mark => {
  const { type, data } = mark

  const applyMark = node => {
    if (node.object === 'mark') {
      return transformMark(node)
    } else if (node.object === 'text') {
      node.leaves = node.leaves.map(leaf => {
        leaf.marks = leaf.marks || []
        leaf.marks.push({
          type,
          data
        })
        return leaf
      })
    } else {
      node.nodes = node.nodes.map(applyMark)
    }

    return node
  }

  return mark.nodes.reduce((nodes, node) => {
    const ret = applyMark(node)
    if (Array.isArray(ret)) {
      return nodes.concat(ret)
    }
    return nodes.concat(ret)
  }, [])
}

export const create = transformNode

export default create
