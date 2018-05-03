import { curry } from 'ramda'
import {
  focusNextBlock,
  focusPreviousBlock
} from '../actions/slate'

export const getStartOrEndBlock = isBlock => (
  event,
  change
) =>
  (isBlock(change.value.startBlock) &&
    change.value.startBlock) ||
  (isBlock(change.value.endBlock) &&
    change.value.endBlock)

export const getAncestor = isBlock => (
  event,
  change,
  node
) =>
  change.value.document.getClosest(
    node.key,
    isBlock
  )

export const callAction = action => (
  event,
  change,
  node,
  contextNode
) => action(change, node, contextNode)

export const preventAndCallAction = action => (
  event,
  change,
  node,
  contextNode
) => {
  event.preventDefault()
  return action(change, node, contextNode)
}

export const preventAndReturn = event => {
  event.preventDefault()
  return true
}

export const pass = () => {}

export const isKey = curry(
  (key, event) => event.key === key
)

export const isEnter = isKey('Enter')
export const isBackspace = isKey('Backspace')
export const isDelete = isKey('Delete')

export const onEvent = curry(
  (isEvent, handler) => {
    return (event, change) => {
      if (!isEvent(event)) {
        return
      }
      return handler(event, change)
    }
  }
)

export const handleNodes = (...args) => {
  const [handler, ...rest] = args.reverse()
  const getters = rest.reverse()

  return (event, change) => {
    let nodes = []
    for (const getter of getters) {
      const ret = getter(event, change, ...nodes)
      if (!ret) {
        return
      }
      nodes.push(ret)
    }
    return handler(event, change, ...nodes)
  }
}

export const handleSelection = curry(
  (
    collapsedHandler,
    expandedHandler,
    expandedMixedHandler
  ) => {
    return (event, change, ...args) => {
      const { value } = change
      let handler
      if (value.isCollapsed) {
        handler = collapsedHandler
      } else if (
        value.startBlock !== value.endBlock
      ) {
        handler = expandedMixedHandler
      } else {
        handler = expandedHandler
      }
      return handler(event, change, ...args)
    }
  }
)

export const handleCursorPosition = curry(
  (
    collapsedHandler,
    collapsedAtStartHandler,
    collapsedAtEndHandler
  ) => (event, change, node, contextNode) => {
    const { value } = change
    let handler
    if (value.selection.hasStartAtStartOf(node)) {
      handler = collapsedAtStartHandler
    } else if (
      value.selection.hasEndAtEndOf(node)
    ) {
      handler = collapsedAtEndHandler
    } else {
      handler = collapsedHandler
    }
    return handler(
      event,
      change,
      node,
      contextNode
    )
  }
)

export const preventSplit = isNode =>
  onEvent(
    isEnter,
    handleSelection(
      // collapsed
      handleNodes(
        getStartOrEndBlock(isNode),
        preventAndCallAction(focusNextBlock)
      ),
      // expanded
      pass,
      // expanded and mixed
      handleNodes(
        getStartOrEndBlock(isNode),
        preventAndCallAction(change =>
          change.collapseToEnd()
        )
      )
    )
  )

export const preventBackwardMerge = isNode =>
  onEvent(
    isBackspace,
    handleSelection(
      // collapsed
      handleCursorPosition(
        // collapsed
        pass,
        // at start
        handleNodes(
          getStartOrEndBlock(isNode),
          preventAndCallAction(focusPreviousBlock)
        ),
        // at end
        pass
      ),
      // expanded
      pass,
      // expanded and mixed
      handleNodes(
        getStartOrEndBlock(isNode),
        preventAndCallAction(change =>
          change.collapseToStart()
        )
      )
    )
  )

export const preventForwardMerge = isNode =>
  onEvent(
    isDelete,
    handleNodes(
      getStartOrEndBlock(isNode),
      handleSelection(
        handleCursorPosition(
          pass,
          preventAndReturn,
          preventAndReturn
        ),
        pass,
        preventAndCallAction(change =>
          change.collapseToStart()
        )
      )
    )
  )
