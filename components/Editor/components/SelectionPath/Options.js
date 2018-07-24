import React from 'react'
import PropTypes from 'prop-types'
import Slot from '../Slot'
import { withSelectedStatus } from '../../apps/selectionPath'

export const ID = 'PUBLIKATOR_SELECTION_PATH'

const SelectionPathOptions = withSelectedStatus(
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
