import actionTypes from '../constants/actionTypes'

export const change = t => ({
  type: actionTypes.CHANGE,
  payload: { change: t }
})

export const selectNode = node => ({
  type: actionTypes.SELECT_NODE,
  payload: { node }
})

export const addMark = mark => ({
  type: actionTypes.ADD_MARK,
  payload: { mark }
})

export const removeMark = mark => ({
  type: actionTypes.REMOVE_MARK,
  payload: { mark }
})

export const addInline = inline => ({
  type: actionTypes.ADD_INLINE,
  payload: { inline }
})

export const removeInline = inline => ({
  type: actionTypes.REMOVE_INLINE,
  payload: { inline }
})

export const updateData = (node, data) => ({
  type: actionTypes.UPDATE_DATA,
  payload: { node, data }
})
