import { connect } from 'react-redux'

export const START_EDITING = 'START_EDITING'
export const CONFIRM_FOCUS = 'CONFIRM_FOCUS'
export const FINISH_EDITING = 'FINISH_EDITING'

export const DEFAULT_NAMESPACE = 'DEFAULT'

export const startEditing = namespace => ({
  type: START_EDITING,
  payload: { namespace }
})

export const finishEditing = namespace => ({
  type: FINISH_EDITING,
  payload: { namespace }
})

export const confirmFocus = namespace => ({
  type: CONFIRM_FOCUS,
  payload: { namespace }
})

const initialState = {
  inEditMode: false,
  currentNamespace: DEFAULT_NAMESPACE,
  shouldFocus: false
}

export const reducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case START_EDITING:
      if (
        state.currentNamespace !==
        payload.namespace
      ) {
        return {
          inEditMode: true,
          currentNamespace: payload.namespace,
          shouldFocus: state.inEditMode === false
        }
      }
      return state
    case CONFIRM_FOCUS:
      return {
        ...state,
        shouldFocus: false
      }
    case FINISH_EDITING:
      return {
        inEditMode: false,
        currentNamespace: DEFAULT_NAMESPACE,
        shouldFocus: true
      }
    default:
      return state
  }
}

const mapStateToProps = namespace => ({
  editMode: state
}) => {
  return {
    isEditing:
      state.inEditMode &&
      namespace === state.currentNamespace,
    shouldFocus:
      state.shouldFocus &&
      namespace === state.currentNamespace
  }
}

const mapDispatchToProps = namespace => dispatch => ({
  startEditing: () =>
    dispatch(startEditing(namespace)),
  finishEditing: () =>
    dispatch(finishEditing(namespace)),
  confirmFocus: () =>
    dispatch(confirmFocus(namespace))
})

const mergeProps = (
  stateProps,
  dispatchProps,
  ownProps
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  focusRef: n => {
    if (n && n.focus && stateProps.shouldFocus) {
      dispatchProps.confirmFocus()
      n.focus()
    }
  }
})

const areStatesEqual = (prev, next) => {
  return (
    (prev.isEditing === next.isEditing &&
      prev.shouldFocus === true &&
      next.shouldFocus === false) ||
    prev === next
  )
}

export const withEditMode = ({ namespace }) =>
  connect(
    mapStateToProps(namespace),
    mapDispatchToProps(namespace),
    mergeProps,
    { areStatesEqual }
  )
