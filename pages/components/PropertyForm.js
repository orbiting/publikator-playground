import React from 'react'
import PropTypes from 'prop-types'
import Slot from './Slot'
import withIsSelected from './hoc/withIsSelected'

export const ID = 'PROPERTY_FORM'

const PropertyForm = withIsSelected(
  ({ children, isSelected }) => {
    return (
      <div>
        {isSelected && <Slot id={ID}>{children}</Slot>}
      </div>
    )
  }
)

PropertyForm.propTypes = {
  node: PropTypes.object.isRequired
}

export default PropertyForm
