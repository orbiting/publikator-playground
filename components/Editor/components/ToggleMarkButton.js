import { compose, dissoc } from 'ramda'

import React from 'react'
import { connect } from 'react-redux'

import ToggleButton from './ToggleButton'
import { isMark } from '../lib'
import { addMark, removeMark } from '../changes'

const cleanProps = compose(
  dissoc('children'),
  dissoc('editor'),
  dissoc('mark'),
  dissoc('value'),
  dissoc('dispatch')
)

const withValue = connect(state => ({
  value: state.value,
}))

const clickHandler = ({
  editor,
  mark,
}) => isActive => {
  return isActive
    ? editor.change(removeMark, mark)
    : editor.change(addMark, mark)
}

export default withValue(props => {
  const { children, mark, value } = props
  const active = value.activeMarks.some(
    isMark(mark)
  )
  return (
    <ToggleButton
      active={active}
      disabled={
        !active && value.selection.isCollapsed
      }
      onClick={clickHandler(props)}
      {...cleanProps(props)}
    >
      {children}
    </ToggleButton>
  )
})
