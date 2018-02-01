import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { isInline } from '../utils'
import { addInline, removeInline } from '../actions/slate'
import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'

const InlineButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

InlineButton.propTypes = {
  icon: PropTypes.func.isRequired
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
