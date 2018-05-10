import React from 'react'
import { css } from 'glamor'
import SlotContainer from '../SlotContainer'
import { ID } from './Options'

const styles = {
  container: css({
    minHeight: '40px'
  })
}

export default () => {
  return (
    <SlotContainer
      {...styles.container}
      id={ID}
    />
  )
}
