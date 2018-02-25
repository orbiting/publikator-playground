import { curry } from 'ramda'
import { when, not } from './'

export const isOfType = curry(
  (type, node) => node && node.type === type
)

export const isImageParagraph = node =>
  node &&
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

export const transformOrNew = (transform, constructFn) => (
  node,
  next
) => transform(node, next) || constructFn(node)

export const transformOrSkip = transform => (
  node,
  next
) => {
  const ret = transform(node, next)
  return [ret, !ret]
}

export const transformIfNotEmpty = (transform, isEmptyFn) =>
  when(not(isEmptyFn), transform)

export const getExactNodes = transforms => (
  nodes,
  next
) => {
  if (!nodes) {
    return
  }

  let currentIndex = 0

  return transforms.reduce((memo, transform) => {
    const ret = transform(nodes[currentIndex], next)
    const [result, skip] = Array.isArray(ret)
      ? ret
      : [ret, false]
    if (result || !skip) {
      currentIndex += 1
    }
    return result ? memo.concat(result) : memo
  }, [])
}
