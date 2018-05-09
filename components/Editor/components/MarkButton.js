import React from 'react'

import ToggleButton from './ToggleButton'
import withToggleMark from '../hoc/withToggleMark'

const MarkButton = ({ children, ...props }) => (
  <ToggleButton {...props}>
    {children}
  </ToggleButton>
)

export default withToggleMark(MarkButton)
