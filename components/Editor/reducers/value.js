import actionTypes from '../constants/actionTypes'

export default (
  value = null,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CHANGE:
      return payload.change.value

    default:
      return value
  }
}
