import TreeUtils from 'immutable-treeutils'
import { Seq, List, Map } from 'immutable'

const tree = new TreeUtils(
  Seq.of('document'),
  'key',
  'nodes'
)

export const getSelectionPath = value => {
  return List([value.startKey])
    .map(key => tree.byId(value, key))
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
    .filter(n => n.object !== 'text')
    .toList()
}

export const getChildIndex = (value, node) => {
  return tree.childIndex(value, node.key)
}

export const getParent = (value, node) => {
  return value.getIn(tree.parent(value, node.key))
}

const getClosest = (filter, node, value) =>
  value.document.getClosest(node.key, filter)
const getFurthest = (filter, node, value) =>
  value.document.getClosest(node.key, filter)

const getInSelection = selector => (filter, value) => {
  return value.blocks.reduce((memo, node) => {
    const res = selector(filter, node, value)
    if (res) {
      return memo.set(res.key, res)
    }
    return memo
  }, Map())
}

export const getClosestInSelection = getInSelection(
  getClosest
)
export const getFurthestInSelection = getInSelection(
  getFurthest
)
