import { curry } from 'ramda'
import { Mark, Block, Inline, Document } from 'slate'

export const composePlugin = (...fns) => opts =>
  fns.reduce(
    (memo, fn) => Object.assign(memo, fn(opts)),
    {}
  )

export const exec = (...fns) => (...args) => {
  return fns.reduce((memo, fn) => {
    return memo || fn(...args)
  }, undefined)
}

export const callOrJust = maybeFn =>
  typeof maybeFn === 'function' ? maybeFn() : maybeFn

export const when = (matcher, fn) => (...args) =>
  (matcher(...args) && fn(...args)) || undefined

export const all = (...fns) => (...args) =>
  fns.every(fn => fn(...args))

export const any = (...fns) => (...args) =>
  fns.some(fn => fn(...args))

export const getType = node => node.type

export const typeOrTypeProp = maybeString =>
  (typeof maybeString === 'string' && maybeString) ||
  (maybeString && maybeString.type)

export const isBlock = curry((type, node) => {
  return (
    Block.isBlock(node) &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isInline = curry((type, node) => {
  return (
    Inline.isInline(node) &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isMark = curry((type, node) => {
  return (
    Mark.isMark(node) &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isDocument = node => Document.isDocument(node)
