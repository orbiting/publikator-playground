import React from 'react'
import Button from './Button'
import withInsertBlock from '../hoc/withInsertBlock'

const InsertBlockButton = ({
  children,
  // eslint-disable-next-line
  block, // remove invalid props to pass
  // eslint-disable-next-line
  insertAfter, // remove invalid props to pass
  ...props
}) => <Button {...props}>{children}</Button>

export default withInsertBlock(InsertBlockButton)
