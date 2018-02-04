import actionTypes from '../constants/actionTypes'

export const change = t => ({
  type: actionTypes.CHANGE,
  payload: { change: t }
})

export const selectNode = node => ({
  type: actionTypes.SELECT_NODE,
  payload: { node }
})
