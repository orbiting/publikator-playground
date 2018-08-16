import React from 'react'
import Slot from '../Slot'
import {
  withSelectionStatus,
  DOM_NODE_ID,
} from '../../apps/selectionPath'

const Selected = withSelectionStatus()(
  ({ children, isSelected }) => {
    return (
      (isSelected && (
        <Slot id={DOM_NODE_ID}>{children}</Slot>
      )) ||
      null
    )
  }
)

export default Selected
