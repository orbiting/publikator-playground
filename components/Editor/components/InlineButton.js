import React from 'react'

import ToggleButton from './ToggleButton'
import withToggleInline from '../hoc/withToggleInline'

const InlineButton = ({ children, ...props }) => (
  <ToggleButton {...props}>
    {children}
  </ToggleButton>
)

export default withToggleInline(InlineButton)
