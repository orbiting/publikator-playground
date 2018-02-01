import React from 'react'
import PropTypes from 'prop-types'

const mouseDownHandler = onClick => event => {
  event.preventDefault()
  onClick && onClick(event)
}

const Button = ({ onClick, children, ...props }) => (
  <button
    onMouseDown={mouseDownHandler(onClick)}
    {...props}
  >
    {children}
  </button>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Button
