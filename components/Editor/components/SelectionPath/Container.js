import React from 'react'
import { css } from 'glamor'
import { ID } from './Options'

const styles = {
  content: css({
    width: 0,
    '&:empty': {
      height: 0
    }
  })
}

export default () => {
  return <div {...styles.content} id={ID} />
}
