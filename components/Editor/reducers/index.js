import ui from './ui'
import value from './value'
import actionTypes from '../constants/actionTypes'

export default {
  ui,
  value
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE:
      return ui(value(state, action), action)
  }
}
