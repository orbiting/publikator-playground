import { reducer as valueReducer } from './apps/value'
import { reducer as selectionPathReducer } from './apps/selectionPath'
import { reducer as editModeReducer } from './apps/editMode'

export default {
  selectionPath: selectionPathReducer,
  value: valueReducer,
  editMode: editModeReducer
}
