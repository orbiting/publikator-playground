import { curry } from 'ramda'

// #TODO: Change name
export const exec = (...fns) => (...args) => {
  return fns.reduce((memo, fn) => {
    return memo || fn(...args)
  }, undefined)
}

export const callOrJust = maybeFn =>
  typeof maybeFn === 'function' ? maybeFn() : maybeFn

export const not = fn => (...args) => !fn(...args)

export const when = (matcher, fn) => (...args) =>
  (matcher(...args) && fn(...args)) || undefined

export const getType = node => node.type
export const getObject = node => node.object

export const typeOrTypeProp = maybeString =>
  (typeof maybeString === 'string' && maybeString) ||
  (maybeString && maybeString.type)

export const isBlock = curry((type, node) => {
  return (
    node &&
    getObject(node) === 'block' &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isInline = curry((type, node) => {
  return (
    node &&
    getObject(node) === 'inline' &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isMark = curry((type, node) => {
  return (
    node &&
    getObject(node) === 'mark' &&
    getType(node) === typeOrTypeProp(type)
  )
})

export const isDocument = node =>
  node && getObject(node) === 'document'

export const isText = node =>
  node && getObject(node) === 'text'
