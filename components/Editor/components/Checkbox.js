import React from 'react'
import PropTypes from 'prop-types'

let i = 0
const getId = () => {
  i++
  return `checkbox-${i}`
}

const mouseDownHandler = event =>
  event.stopPropagation()

const changeHandler = onChange => event => {
  onChange && onChange(event.target.checked)
}

const Checkbox = ({
  name,
  label,
  checked,
  disabled,
  onChange
}) => {
  const id = getId(9)
  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onMouseDown={mouseDownHandler}
        onChange={changeHandler(onChange)}
      />
      {label}
    </label>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool
}

export default Checkbox
