import React from 'react'
import PropTypes from 'prop-types'

let localKey = 0
const getKey = () => {
  localKey++
  return `checkbox-${localKey}`
}

const mouseDownHandler = event =>
  event.preventDefault()

const changeHandler = onChange => event => {
  onChange && onChange(event.target.value)
}

const Checkbox = ({
  name,
  label,
  checked,
  value,
  disabled,
  onChange
}) => {
  const id = getKey()
  return (
    <label htmlFor={id}>
      <input
        id={id}
        name={name}
        value={value}
        type="radio"
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
