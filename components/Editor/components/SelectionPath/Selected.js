import React from 'react'
import Slot from '../Slot'
import { withSelectionStatus } from '../../apps/selectionPath'

const Selected = withSelectionStatus()(
  ({ children, isSelected }) => {
    return (
      (isSelected && (
        <Slot id={'foo'}>{children}</Slot>
      )) ||
      null
    )
  }
)

export default Selected
