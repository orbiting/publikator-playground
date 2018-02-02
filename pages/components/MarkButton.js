import React from 'react'

import ToggleButton from './ToggleButton'
import withToggleMark from '../hoc/withToggleMark'

const MarkButton = ({
  children,
  // eslint-disable-next-line
  mark, // remove invalid props to pass
  ...props
}) => <ToggleButton {...props}>{children}</ToggleButton>

export default withToggleMark(MarkButton)
