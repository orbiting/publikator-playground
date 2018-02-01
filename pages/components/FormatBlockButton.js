import React from 'react'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'
import withFormatBlock from '../hoc/withFormatBlock'

const BlockButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

BlockButton.propTypes = {
  icon: PropTypes.func.isRequired
}

export default withFormatBlock(BlockButton)
