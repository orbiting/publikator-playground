import TreeUtils from 'immutable-treeutils'
import { Seq, List, Map } from 'immutable'
import actionTypes from '../constants/actionTypes'

const tree = new TreeUtils(
  Seq.of('document'),
  'key',
  'nodes'
)

const initialState = {
  selectedNode: null,
  selectionPath: null
}

export default (
  state = initialState,
  { type, payload }
) => {
  let value
  switch (type) {
    case actionTypes.CHANGE:
      value = payload.change.value
      if (value.startBlock !== value.endBlock) {
        return initialState
      }
      const selectionPath = value.blocks
        .map(n => tree.byId(value, n.key))
        .reduce(
          (memo, path) =>
            memo
              .push(path)
              .concat(tree.ancestors(value, path)),
          List()
        )
        .reduceRight(
          (memo, path) =>
            memo.set(tree.id(value, path), path),
          Map()
        )
        .map(value.getIn.bind(value))
        .toList()

      const res = Object.assign({}, state, {
        selectionPath,
        selectedNode: selectionPath.last()
      })
      console.log(res.selectedNode.type)
      return res

    default:
      return state
  }
}
