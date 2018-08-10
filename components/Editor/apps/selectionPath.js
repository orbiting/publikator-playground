import { connect } from 'react-redux'
import {
  getSelectionPath,
  isCompleteBlockSelected
} from '../lib/selection'

import { CHANGE } from './value'
export const SELECT_NODE = 'SELECT_NODE'

export const withSelectedStatus = connect(
  (state, { offset, node }) => {
    return {
      isSelected:
        !!state.selectionPath.selectedNode &&
        (state.selectionPath.selectedNode.key ===
          node.key ||
          state.selectionPath.selectionPath
            .skipLast(1)
            .takeLast(offset)
            .some(n => n.key === node.key))
    }
  },
  /* empty */ () => ({}),
  (
    stateProps,
    dispatchProps,
    // eslint-disable-next-line
    { offset, node, ...ownProps }
  ) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  })
)

export const withApp = connect(
  state => ({
    selectionPath:
      state.selectionPath.selectionPath,
    selectedNode: state.selectionPath.selectedNode
  }),
  dispatch => ({
    onSelect: node => dispatch(selectNode(node))
  })
)

export const selectNode = node => ({
  type: SELECT_NODE,
  payload: { node }
})

const initialState = {
  selectedNode: null,
  selectionPath: null
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
          selectedNode: selectionPath.last()
        }
      }
      return initialState
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: payload.node
      }
    default:
      return state
  }
}
