import actionTypes from '../constants/actionTypes'

export const change = t => ({
  type: actionTypes.CHANGE,
  payload: { change: t }
})

export const selectNode = t => ({
  type: actionTypes.SELECT_NODE,
  payload: { change: t }
})
