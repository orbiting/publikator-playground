import { curry } from 'ramda'

export const isOfType = curry(
  (type, node) => node && node.type === type
)

export const isImageParagraph = node =>
  node.type === 'paragraph' &&
  node.children &&
  node.children.length &&
  node.children[0].type === 'image'

export const isZone = curry(
  (identifier, node) =>
    node.type === 'zone' && node.identifier === identifier
)

export const isHeading = curry(
  (depth, node) =>
    node.type === 'heading' && node.depth === depth
)

export const isParagraph = isOfType('paragraph')

export const matchOrNew = (rule, constructFn) => ({
  matchMdast: () => true,
  fromMdast: (node, ...args) =>
    (rule.matchMdast(node) &&
      rule.fromMdast(node, ...args)) ||
    (rule.newNode && rule.newNode(node)) ||
    (constructFn && constructFn(node))
})

export const matchOrSkip = rule => ({
  matchMdast: node =>
    rule.matchMdast(node) ? [true, false] : [false, true],
  fromMdast: rule.fromMdast
})

export const getNodes = (...rules) => (
  node,
  index,
  parent,
  rest
) => {
  if (!node || !node.children) {
    return
  }
  let currentIndex = 0
  const nodes = rules.reduce((memo, rule) => {
    const matchResult = rule.matchMdast(
      node.children[currentIndex]
    )
    const [match, skip] = Array.isArray(matchResult)
      ? matchResult
      : [matchResult, false]

    const result = match
      ? memo.concat(
          rule.fromMdast(
            node.children[currentIndex],
            currentIndex,
            node,
            rest
          )
        )
      : memo
    if (match || !skip) {
      currentIndex += 1
    }
    return result
  }, [])
  return nodes
}

export const getExactNodes = getNodes
