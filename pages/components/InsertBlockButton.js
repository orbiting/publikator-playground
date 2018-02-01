import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import buttonStyles from '../styles/buttonStyles'
import withInsertBlock from '../hoc/withInsertBlock'

const InsertBlockButton = ({
  icon: Icon,
  // eslint-disable-next-line
  block, // remove invalid props to pass
  // eslint-disable-next-line
  insertAfter, // remove invalid props to pass
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
