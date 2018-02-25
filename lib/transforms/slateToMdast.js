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
  if (element.object === 'text' && element.leaves) {
    return transformNodes(transformers)(
      element.leaves.map(prepareLeaf)
    )
  }

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
          `Slate to MDAST: The \`next\` argument was called with invalid argument "${elements}".`
        )
    }
  }
  if (!element.object && !element.type && element.nodes) {
    element.object = 'document'
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
        `Slate to MDAST: A transformer returned an invalid value "${node}".`
      )
    }

    if (ret === undefined) {
      continue
    } else if (ret === null) {
      return null
    } else {
      node = ret
    }

    break
  }

  if (!node) {
    throw new Error(
      `Slate to MDAST: No transformer found for Slate node of type "${
        element.type
      }"`
    )
  }

  return node || next(element.children)
}

const prepareLeaf = leaf => {
  const marks =
    (leaf.marks && leaf.marks.length && leaf.marks) || []
  return marks.reduceRight(
    (child, parent) => ({
      ...parent,
      object: 'mark',
      nodes: [child]
    }),
    { object: 'text', text: leaf.text }
  )
}

export const create = transformNode
