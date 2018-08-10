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
  conversionStrategy
}) => isActive => {
  return (
    !isActive &&
    (!conversionStrategy
      ? editor.change(
          convertBlock,
          node,
          block,
          defaultConversionStrategy
        )
      : editor.change(
          conversionStrategy,
          node,
          block
        ))
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
