import { connect } from 'react-redux'

export const CHANGE = 'CHANGE'

export const change = t => ({
  type: CHANGE,
  payload: { change: t }
})

export const withApp = connect(
  (
    { value: valueFromState },
    { initialValue }
  ) => {
    return {
      value: valueFromState || initialValue
    }
  },
  dispatch => {
    return {
      onChange: t => {
        dispatch(change(t))
      }
    }
  }
)

export const withValue = connect(({ value }) => {
  return { value }
})

export const reducer = (
  value = null,
  { type, payload }
) => {
  switch (type) {
    case CHANGE:
      return payload.change.value
    default:
      return value
  }
}
