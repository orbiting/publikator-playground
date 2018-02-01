import { connect } from 'react-redux'

import { isMark } from '../utils'
import { addMark, removeMark } from '../actions/slate'

const mapStateToProps = (state, { editor, mark }) => {
  const onClick = isActive => {
    return isActive
      ? editor.change(removeMark, mark)
      : editor.change(addMark, mark)
  }

  const active = state.value.activeMarks.some(isMark(mark))
  const disabled = !active && state.value.isCollapsed

  return {
    active,
    disabled,
    onClick
  }
}

export default connect(mapStateToProps, () => ({}))
