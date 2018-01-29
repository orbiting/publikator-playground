import React from 'react'
import { css } from 'glamor'
import SlotContainer from './SlotContainer'
import { ID } from './PropertyForm'

const styles = {
  container: css({
    minHeight: '40px'
  })
}

export default () => (
  <SlotContainer {...styles.container} id={ID} />
)
