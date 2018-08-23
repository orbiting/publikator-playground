import React from 'react'
import PropTypes from 'prop-types'

const stop = event => {
  event.preventDefault()
  event.stopPropagation()
}

const clickHandler = onClick => event => {
  stop(event)
  onClick && onClick(event)
}

const Button = ({
  onClick,
  children,
  ...props
}) => (
  <button
    onMouseDown={stop}
    onClick={clickHandler(onClick)}
    {...props}
  >
    {children}
  </button>
)

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

export default Button
