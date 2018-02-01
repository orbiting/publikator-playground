import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import buttonStyles from '../styles/buttonStyles'
import withInsertBlock from '../hoc/withInsertBlock'

const InsertBlockButton = ({
  icon: Icon,
  // eslint-disable-next-line
  block,
  // eslint-disable-next-line
  insertAfter,
  ...props
}) => (
  <Button {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </Button>
)

InsertBlockButton.propTypes = {
  icon: PropTypes.func.isRequired
}

export default withInsertBlock(InsertBlockButton)
