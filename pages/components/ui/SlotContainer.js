import React from 'react'

export default ({ id, ...props }) => (
  <div id={id} {...props} />
)
