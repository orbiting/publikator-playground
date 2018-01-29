import TreeUtils from 'immutable-treeutils'
import { curry } from 'ramda'
import { Seq, List, Map } from 'immutable'
import { Mark, Block, Inline, Document } from 'slate'

const tree = new TreeUtils(
  Seq.of('document'),
  'key',
  'nodes'
)

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

export const when = (matcher, fn) => (...args) =>
  (matcher(...args) && fn(...args)) || undefined

export const all = (...fns) => (...args) =>
  fns.every(fn => fn(...args))

export const any = (...fns) => (...args) =>
  fns.some(fn => fn(...args))

export const getType = node => node.type

export const isBlock = curry((type, node) => {
  return Block.isBlock(node) && getType(node) === type
})

export const isInline = curry(
  (type, node) =>
    Inline.isInline(node) && getType(node) === type
)

export const isMark = curry(
  (type, node) =>
    Mark.isMark(node) && getType(node) === type
)
export const isDocument = () => node =>
  Document.isDocument(node)

export const getSelectionPath = value => {
  return value.blocks
    .map(n => tree.byId(value, n.key))
    .reduce(
      (memo, path) =>
        memo.push(path).concat(tree.ancestors(value, path)),
      List()
    )
    .reduceRight(
      (memo, path) => memo.set(tree.id(value, path), path),
      Map()
    )
    .map(value.getIn.bind(value))
    .toList()
}

const getClosest = curry((filter, node, value) =>
  value.document.getClosest(node.key, filter)
)
const getFurthest = curry((filter, node, value) =>
  value.document.getClosest(node.key, filter)
)

const getInSelection = curry((selector, filter, value) => {
  return value.blocks.reduce((memo, node) => {
    const res = selector(filter, node, value)
    if (res) {
      return memo.set(res.key, res)
    }
    return memo
  }, Map())
})

export const getClosestInSelection = getInSelection(
  getClosest
)

export const getFurthestInSelection = getInSelection(
  getFurthest
)
