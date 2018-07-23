import { dissoc, compose } from 'ramda'

import React from 'react'
import ToggleButton from './ToggleButton'
import { isBlock } from '../lib'
import { convertBlock } from '../changes'

const defaultConversionStrategy = (
  change,
  node,
  type
) => node.set('type', type)

const cleanProps = compose(
  dissoc('children'),
  dissoc('editor'),
  dissoc('node'),
  dissoc('block'),
  dissoc('conversionStrategy')
)

const clickHandler = ({
  editor,
  node,
  block,
  conversionStrategy = defaultConversionStrategy
}) => isActive => {
  return (
    !isActive &&
    editor.change(
      convertBlock,
      node,
      block,
      conversionStrategy
    )
  )
}

export default props => {
  const { children, node, block } = props
  const active = isBlock(block, node)
  return (
    <ToggleButton
      {...cleanProps(props)}
      active={active}
      disabled={active}
      onClick={clickHandler(props)}
    >
      {children}
    </ToggleButton>
  )
}
