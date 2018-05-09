import React from 'react'
import Button from './Button'
import withInsertBlock from '../hoc/withInsertBlock'

const InsertBlockButton = ({
  children,
  ...props
}) => <Button {...props}>{children}</Button>

export default withInsertBlock(InsertBlockButton)
