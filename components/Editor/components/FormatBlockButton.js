import React from 'react'
import ToggleButton from './ToggleButton'
import withFormatBlock from '../hoc/withFormatBlock'

const FormatBlockButton = ({ children, ...props }) => (
  <ToggleButton {...props}>{children}</ToggleButton>
)

export default withFormatBlock(FormatBlockButton)
