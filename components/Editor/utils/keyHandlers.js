import { Block } from 'slate'
import { isBlock } from './'
import { updateData } from '../actions/slate'
import { getClosestInSelection } from './selection'

const focusNext = change => {
  const { value } = change
  const nextBlock = value.document.getNextBlock(
    value.endBlock.key
  )
  if (nextBlock) {
    return change.collapseToStartOf(nextBlock)
  }
  return true
}

const focusPrevious = change => {
  const { value } = change
  const nextBlock = value.document.getPreviousBlock(
    value.endBlock.key
  )
  if (nextBlock) {
    return change.collapseToEndOf(nextBlock)
  }
  return true
}

const insertAfter = (
  change,
  afterType,
  insertAfterType
) => {
  const { value } = change
  const rootNode =
    (insertAfterType &&
      value.document.getClosest(
        value.endBlock.key,
        isBlock(insertAfterType)
      )) ||
    value.document

  const index = rootNode.nodes.findIndex(n => {
    return (
      n.key === value.endBlock.key ||
      !!n.findDescendant(m => m.key === value.endBlock.key)
    )
  })

  if (index !== -1) {
    return change.insertNodeByKey(
      rootNode.key,
      index + 1,
      Block.create({ type: afterType })
    )
  }
  return change
}

export const staticText = ({
  type,
  afterType,
  insertAfterType
}) => {
  return (event, change) => {
    const isBackspace = event.key === 'Backspace'
    const isEnter = event.key === 'Enter'
    const isTab = event.key === 'Tab'
    const isDelete = event.key === 'Delete'

    if (!isBackspace && !isEnter && !isDelete && !isTab) {
      return
    }
    const { value } = change
    const inSelection = value.blocks.some(isBlock(type))
    if (
      inSelection &&
      value.startBlock !== value.endBlock &&
      value.isExpanded
    ) {
      if (isBackspace || isDelete) {
        return change.collapseToStart()
      }
      return change.collapseToEnd()
    }

    const previousBlock = value.document.getPreviousBlock(
      value.startBlock.key
    )
    const isCollapsed = value.isCollapsed
    const cursorAtStart =
      isCollapsed &&
      value.selection.hasStartAtStartOf(value.startBlock)
    if (
      !inSelection &&
      (!isBlock(type, previousBlock) ||
        !cursorAtStart ||
        !isBackspace)
    ) {
      return
    }

    const nextBlock = value.document.getNextBlock(
      value.endBlock.key
    )
    if (isTab) {
      if (nextBlock) {
        event.preventDefault()
        return focusNext(change)
      }
      return
    }

    if (isEnter) {
      if (!afterType) {
        return focusNext(change)
      }

      if (!isBlock(afterType, nextBlock)) {
        return focusNext(
          insertAfter(change, afterType, insertAfterType)
        )
      }
      return focusNext(change)
    }

    const cursorAtEnd =
      isCollapsed &&
      value.selection.hasEndAtEndOf(value.endBlock)

    if (isDelete && cursorAtEnd) {
      event.preventDefault()
      return true
    }

    if (isBackspace && cursorAtStart) {
      event.preventDefault()
      if (
        isBlock(type, previousBlock) &&
        value.startBlock.text === ''
      ) {
        return focusPrevious(change).removeNodeByKey(
          value.startBlock.key
        )
      } else {
        return focusPrevious(change)
      }
    }
  }
}

export const softBreak = ({ type }) => (event, change) => {
  const { value } = change
  if (event.key !== 'Enter') return
  if (event.shiftKey === false) return

  const { startBlock } = value
  if (type !== startBlock.type) {
    return
  }
  return change.insertText('\n')
}

export const removeEmpty = ({ type, isEmpty }) => (
  event,
  change
) => {
  if (event.key !== 'Backspace' && event.key !== 'Delete') {
    return
  }

  const emptyNodes = getClosestInSelection(
    n => isBlock(type, n) && isEmpty(n),
    change.value
  )
  if (emptyNodes.size < 1) return

  return emptyNodes.reduce((t, node) => {
    return t.removeNodeByKey(node.key)
  }, change)
}

export const removeImage = ({ type }) => (
  event,
  change,
  editor
) => {
  if (event.key !== 'Backspace' && event.key !== 'Delete') {
    return
  }
  const { value } = change
  if (
    isBlock(type, value.startBlock) &&
    !!value.startBlock.data.get('url')
  ) {
    event.preventDefault()
    editor.change(updateData, value.startBlock, {
      url: null
    })
    return true
  }
}
