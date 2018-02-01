import React from 'react'
import PropTypes from 'prop-types'

const mouseDownHandler = (onClick, active) => event => {
  event.preventDefault()
  onClick && onClick(active)
}

const ToggleButton = ({
  onClick,
  active,
  children,
  ...props
}) => (
  <button
    onMouseDown={mouseDownHandler(onClick, active)}
    {...props}
    data-active={active}
  >
    {children}
  </button>
)

ToggleButton.propTypes = {
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default ToggleButton
