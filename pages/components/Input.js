import React from 'react'
import { css } from 'glamor'

const styles = {
  input: css({
    border: 'none',
    borderBottom: '1px solid #ccc',
    '&:focus': {
      borderBottom: '1px solid #000'
    }
  })
}

export default ({ label, onChange, ...props }) => (
  <label>
    {label}
    <input
      {...props}
      {...styles.input}
      onChange={e => onChange && onChange(e.target.value)}
    />
  </label>
)
