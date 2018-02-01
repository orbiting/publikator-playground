import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addInline, removeInline } from '../actions/slate'
import IconButton from './IconButton'
import { isInline } from '../utils'

const InlineButton = ({
  icon: Icon,
  onClick,
  ...props
}) => (
  <IconButton
    onClick={() => onClick(props.active)}
    {...props}
  >
    <Icon size={24} />
  </IconButton>
)

InlineButton.propTypes = {
  inline: PropTypes.any.isRequired,
  icon: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

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

export default connect(mapStateToProps, () => ({}))(
  InlineButton
)
