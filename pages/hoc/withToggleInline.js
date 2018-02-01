import { connect } from 'react-redux'

import { isInline } from '../utils'
import { addInline, removeInline } from '../actions/slate'

const mapStateToProps = (state, ownProps) => {
  const { editor, inline } = ownProps
  const onClick = isActive => {
    return isActive
      ? editor.change(removeInline, inline)
      : editor.change(addInline, inline)
  }

  const active = state.value.inlines.some(isInline(inline))
  const disabled = !active && state.value.isCollapsed
  return {
    active,
    disabled,
    onClick
  }
}

export default connect(mapStateToProps, () => ({}))
