import { connect } from 'react-redux'

import { isInline } from '../utils'
import { addInline, removeInline } from '../actions/slate'

const mapStateToProps = (state, ownProps) => {
  const { editor, inline } = ownProps
  const active = state.value.inlines.some(isInline(inline))
  return {
    active,
    disabled: !active && state.value.isCollapsed,
    onClick: isActive => {
      return isActive
        ? editor.change(removeInline, inline)
        : editor.change(addInline, inline)
    }
  }
}

const mergeProps = (
  stateProps,
  dispatchProps,
  // eslint-disable-next-line
  { editor, inline, ...ownProps }
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
