import { curry } from 'ramda'

export {
  isText,
  isDocument,
  isBlock,
  isInline,
  isMark
} from '../../../lib/transform/slate'

// #TODO: Change name
export const returnFirst = (...fns) => (
  ...args
) => {
  return fns.reduce((memo, fn) => {
    return memo || fn(...args)
  }, undefined)
}

export const callOrJust = maybeFn =>
  typeof maybeFn === 'function'
    ? maybeFn()
    : maybeFn

export const not = fn => (...args) => !fn(...args)

export const when = (matcher, fn) => (...args) =>
  (matcher(...args) && fn(...args)) || undefined

export const getType = node => node.type
export const getObject = node => node.object

export const typeOrTypeProp = maybeString =>
  (typeof maybeString === 'string' &&
    maybeString) ||
  (maybeString && maybeString.type)
