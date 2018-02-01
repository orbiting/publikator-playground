import React from 'react'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'
import withToggleInline from '../hoc/withToggleInline'

const InlineButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

InlineButton.propTypes = {
  icon: PropTypes.func.isRequired
}

export default withToggleInline(InlineButton)
