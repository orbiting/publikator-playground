import { curry } from 'ramda'

export const isOfType = curry(
  (type, node) => node.type === type
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
