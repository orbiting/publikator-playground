import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addMark, removeMark } from '../actions/slate'
import IconButton from './IconButton'
import { isMark } from '../utils'

const MarkButton = ({ icon: Icon, onClick, ...props }) => (
  <IconButton
    onClick={() => onClick(props.active)}
    {...props}
  >
    <Icon size={24} />
  </IconButton>
)

MarkButton.propTypes = {
  mark: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
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
