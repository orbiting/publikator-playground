import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addMark, removeMark } from '../actions/slate'
import { isMark } from '../utils'

import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'

const MarkButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

MarkButton.propTypes = {
  icon: PropTypes.func.isRequired
}

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

export default connect(mapStateToProps, () => ({}))(
  MarkButton
)
