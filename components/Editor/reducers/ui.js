import { getSelectionPath } from '../lib/selection'
import actionTypes from '../constants/actionTypes'

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
      const selectionPath = getSelectionPath(value)
      return {
        selectionPath,
        selectedNode: selectionPath.last()
      }
    case actionTypes.SELECT_NODE:
      return {
        ...state,
        selectedNode: payload.node
      }
    default:
      return state
  }
}
