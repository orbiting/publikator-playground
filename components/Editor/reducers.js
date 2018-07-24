import { reducer as valueReducer } from './apps/value'
import { reducer as selectionPathReducer } from './apps/selectionPath'

export default {
  selectionPath: selectionPathReducer,
  value: valueReducer
}
