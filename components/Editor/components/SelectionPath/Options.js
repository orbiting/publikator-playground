import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../Slot'
import withIsSelected from '../../hoc/withIsSelected'

export const ID = 'PUBLIKATOR_SELECTION_PATH'

const SelectionPathOptions = withIsSelected(
  ({ children, isSelected }) => {
    return (
      (isSelected && (
        <Slot id={ID}>{children}</Slot>
      )) ||
      null
    )
  }
)

SelectionPathOptions.propTypes = {
  node: PropTypes.object.isRequired
}

export default SelectionPathOptions
