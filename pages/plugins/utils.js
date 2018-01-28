import { Mark, Block, Inline, Document } from 'slate'

export const composePlugin = (...fns) => opts =>
  fns.reduce(
    (memo, fn) => Object.assign(memo, fn(opts)),
    {}
  )

export const exec = (...fns) => (...args) =>
  fns.reduce((memo, fn) => memo || fn(...args))

export const when = (matcher, fn) => (...args) =>
  (matcher(...args) && fn(...args)) || undefined

export const all = (...fns) => (...args) =>
  fns.every(fn => fn(...args))

export const any = (...fns) => (...args) =>
  fns.some(fn => fn(...args))

export const getType = node => node.type

export const isBlock = (type, node) => {
  return Block.isBlock(node) && getType(node) === type
}

export const isInline = (type, node) =>
  Inline.isInline(node) && getType(node) === type

export const isMark = (type, node) =>
  Mark.isMark(node) && getType(node) === type

export const isDocument = () => node =>
  Document.isDocument(node)
