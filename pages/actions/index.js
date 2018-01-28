import actionTypes from '../constants/actionTypes'

export const change = t => ({
  type: actionTypes.CHANGE,
  payload: { change: t }
})

export const select = t => ({
  type: actionTypes.SELECT,
  payload: { change: t }
})
