import {
  createStore,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import { reducer } from '@self/settings'

export default initialState => {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunkMiddleware)
    )
  )
}
