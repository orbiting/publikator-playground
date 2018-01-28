import React from 'react'

import Slot from './Slot'
import SlotContainer from './SlotContainer'

export { Slot, SlotContainer }

export const PropertyForm = props => (
  <Slot id="propertyForm" {...props} />
)

export const PropertyFormContainer = props => (
  <SlotContainer id="propertyForm" {...props} />
)
