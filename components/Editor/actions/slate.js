import { Mark } from 'slate'
import { isMark } from '../utils'
import {
  getChildIndex,
  getParent
} from '../utils/selection'

export const focusNextBlock = (change, node) => {
  const { value } = change
  const nextBlock = value.document.getNextBlock(node.key)
  if (nextBlock) {
    return change.collapseToStartOf(nextBlock)
  }
  return change
}

export const focusPreviousBlock = (change, node) => {
  const { value } = change
  const nextBlock = value.document.getPreviousBlock(
    node.key
  )
  if (nextBlock) {
    return change.collapseToEndOf(nextBlock)
  }
  return change
}

export const addInline = (change, inline) => {
  return change.wrapInline(inline)
}

export const removeInline = (change, inline) => {
  return change.unwrapInline(inline)
}

export const addMark = (change, mark) => {
  return change.addMark(mark)
}

export const convertBlock = (
  change,
  node,
  block,
  conversionStrategy
) =>
  change.setNodeByKey(
    node.key,
    conversionStrategy(change, node, block)
  )

export const removeMark = (change, mark) => {
  const value = change.value
  if (value.isEmpty) {
    const key = value.startKey
    const offset = value.startOffset
    const characters = value.texts.first().characters
    let i = offset
    let has = true
    while (has) {
      i--
      has = characters.get(i).marks.some(isMark(mark))
    }
    const start = i
    i = offset
    has = true
    while (has) {
      i++
      has = characters.get(i).marks.some(isMark(mark))
    }
    const end = i
    const length = end - start
    return change.removeMarkByKey(
      key,
      start,
      length,
      typeof mark === 'string'
        ? Mark.create({ type: mark })
        : mark
    )
  } else {
    return change.removeMark(mark)
  }
}

export const updateData = (change, node, data) => {
  return change.setNodeByKey(
    node.key,
    node.update('data', v => v.merge(data))
  )
}

export const insertBlock = (change, block) => {
  return change.insertBlock(block)
}

export const insertBlockAfter = (change, block, target) => {
  return change.insertNodeByKey(
    getParent(change.value, target).key,
    getChildIndex(change.value, target) + 1,
    block
  )
}
