import React from 'react'

import ToggleButton from './ToggleButton'
import withToggleInline from '../hoc/withToggleInline'

const InlineButton = ({
  children,
  // eslint-disable-next-line
  inline, // remove invalid props to pass
  ...props
}) => <ToggleButton {...props}>{children}</ToggleButton>

export default withToggleInline(InlineButton)
