import { dissoc } from 'ramda'
import { connect } from 'react-redux'
import {
  getSelectionPath,
  isCompleteBlockSelected,
} from '../lib/selection'

import { CHANGE } from './value'

export const DOM_NODE_ID =
  'PUBLIKATOR_SELECTION_PATH'
export const SELECT_NODE = 'SELECT_NODE'

export const selectNode = node => ({
  type: SELECT_NODE,
  payload: { node },
})

const mapStateToSelectionStatusProps = (
  state,
  { offset, node }
) => {
  return {
    isSelected:
      !!state.selectionPath.selectedNode &&
      (state.selectionPath.selectedNode.key ===
        node.key ||
        state.selectionPath.selectionPath
          .skipLast(1)
          .takeLast(offset)
          .some(n => n.key === node.key)),
  }
}

const cleanProps = dissoc('offset')

export const withSelectionStatus = ({
  passProps = false,
} = {}) => {
  return connect(
    mapStateToSelectionStatusProps,
    null,
    (stateProps, dispatchProps, ownProps) => ({
      ...stateProps,
      ...((passProps && ownProps) ||
        cleanProps(ownProps)),
    })
  )
}

export const withApp = connect(
  state => ({
    selectionPath:
      state.selectionPath.selectionPath,
    selectedNode:
      state.selectionPath.selectedNode,
  }),
  dispatch => ({
    onSelect: node => dispatch(selectNode(node)),
  })
)

const initialState = {
  selectedNode: null,
  selectionPath: null,
}

export const reducer = (
  state = initialState,
  { type, payload }
) => {
  let value
  switch (type) {
    case CHANGE:
      value = payload.change.value

      if (isCompleteBlockSelected(value)) {
        const selectionPath = getSelectionPath(
          value
        )
        return {
          selectionPath,
          selectedNode: selectionPath.last(),
        }
      }
      return initialState
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: payload.node,
      }
    default:
      return state
  }
}
