import { connect } from 'react-redux'

import { isMark } from '../utils'
import { addMark, removeMark } from '../actions/slate'

const mapStateToProps = (state, ownProps) => {
  const { editor, mark } = ownProps
  const active = state.value.activeMarks.some(isMark(mark))
  return {
    active,
    disabled: !active && state.value.isCollapsed,
    onClick: isActive => {
      return isActive
        ? editor.change(removeMark, mark)
        : editor.change(addMark, mark)
    }
  }
}

const mergeProps = (
  stateProps,
  dispatchProps,
  // eslint-disable-next-line
  { editor, mark, ...ownProps }
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  mapStateToProps,
  /* empty */ () => ({}),
  mergeProps
)
