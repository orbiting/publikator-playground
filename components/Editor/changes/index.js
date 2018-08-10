import { Mark } from 'slate'
import { getChildIndex } from '../lib/selection'

export const focusNextBlock = (change, node) => {
  const { value } = change
  const nextBlock = value.document.getNextBlock(
    node.key
  )
  if (nextBlock) {
    return change.collapseToStartOf(nextBlock)
  }
  return change
}

export const focusNext = change => {
  const { value } = change
  const nextBlock = value.document.getNextBlock(
    value.endBlock.key
  )
  if (nextBlock) {
    return change.collapseToStartOf(nextBlock)
  }
  return change
}

export const focusPrevious = change => {
  const { value } = change
  const nextBlock = value.document.getPreviousBlock(
    value.startBlock.key
  )
  if (nextBlock) {
    return change.collapseToEndOf(nextBlock)
  }
  return change
}

export const focusPreviousBlock = (
  change,
  node
) => {
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

export const unwrap = (change, node) => {
  return change.unwrapNodeByKey(node.key)
}

export const wrap = (change, node, parent) => {
  return change.unwrapNodeByKey(node.key, parent)
}

export const convertBlock = (
  change,
  node,
  block,
  conversionStrategy
) => {
  console.log(
    change.setNodeByKey(
      node.key,
      conversionStrategy(change, node, block)
    ).value.document
  )
  return change.setNodeByKey(
    node.key,
    conversionStrategy(change, node, block)
  )
}

export const addMark = (change, mark) => {
  return change.addMark(mark)
}

export const removeMark = (change, mark) => {
  const value = change.value
  if (value.isEmpty) {
    const key = value.startKey
    const offset = value.startOffset
    const text = value.texts.first()
    const {
      endOffset,
      startOffset
    } = text.searchLeafAtOffset(offset)

    return change.removeMarkByKey(
      key,
      startOffset,
      endOffset - startOffset,
      typeof mark === 'string'
        ? Mark.create({ type: mark })
        : mark
    )
  } else {
    return change.removeMark(mark)
  }
}

export const updateData = (
  change,
  node,
  data
) => {
  return change.setNodeByKey(
    node.key,
    node.update('data', v => v.merge(data))
  )
}

export const insertBlock = (change, block) => {
  return change.insertBlock(block)
}

export const removeBlock = (change, block) => {
  return change.removeNodeByKey(block.key)
}

export const insertBlockAfter = (
  change,
  block,
  target
) => {
  return change.insertNodeByKey(
    change.value.document.getParent(target.key)
      .key,
    getChildIndex(change.value, target) + 1,
    block
  )
}

export const insertBlockBefore = (
  change,
  block,
  target
) => {
  return change.insertNodeByKey(
    change.value.document.getParent(target).key,
    getChildIndex(change.value, target).key,
    block
  )
}
