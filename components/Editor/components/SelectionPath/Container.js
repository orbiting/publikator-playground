import React from 'react'
import { css } from 'glamor'
import { Interaction } from '@project-r/styleguide'
import { ID } from './Options'

const styles = {
  container: css({
    minHeight: '40px'
  })
}

export default () => {
  return <div {...styles.container} id={ID} />
}
