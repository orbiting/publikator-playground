import React from 'react'
import { css } from 'glamor'

const styles = {
  button: css({
    minWidth: '40px',
    minHeight: '40px',
    backgroundColor: '#fff',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'row',
    cursor: 'pointer',
    '&[disabled]': {
      cursor: 'default',
      color: '#ccc'
    },
    '&[data-active="true"]': {
      color: '#f00'
    }
  })
}

const mouseDownHandler = onClick => event => {
  event.preventDefault()
  onClick && onClick(event)
}

export default ({
  children,
  onClick,
  active = false,
  disabled = false,
  ...props
}) => (
  <button
    {...props}
    {...styles.button}
    disabled={disabled}
    data-active={active}
    onMouseDown={mouseDownHandler(onClick)}
  >
    {children}
  </button>
)
