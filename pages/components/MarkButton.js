import React from 'react'
import PropTypes from 'prop-types'

import ToggleButton from './ToggleButton'
import buttonStyles from '../styles/buttonStyles'
import withToggleMark from '../hoc/withToggleMark'

const MarkButton = ({ icon: Icon, ...props }) => (
  <ToggleButton {...props} {...buttonStyles.iconButton}>
    <Icon size={24} />
  </ToggleButton>
)

MarkButton.propTypes = {
  icon: PropTypes.func.isRequired
}

export default withToggleMark(MarkButton)
