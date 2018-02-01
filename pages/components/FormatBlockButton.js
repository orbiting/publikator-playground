import React from 'react'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'
import withFormatBlock from '../hoc/withFormatBlock'

const FormatBlockButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

FormatBlockButton.propTypes = {
  icon: PropTypes.func.isRequired
}

export default withFormatBlock(FormatBlockButton)
