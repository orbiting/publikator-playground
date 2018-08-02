import {
  compose,
  converge,
  both,
  ifElse,
  always,
  allPass,
  either
} from 'ramda'

import { removeBlock } from '@orbiting/publikator-editor/changes'

import {
  getChange,
  isCollapsed,
  getParentOf,
  getStartBlock,
  hasEmptyText,
  eventHandler,
  isDelete,
  isBackspace,
  isBlock,
  getClosestOf
} from '@orbiting/publikator-editor/lib'

const onDeleteOrBackspace = compose(
  ifElse(
    allPass([
      isCollapsed,
      compose(
        either(
          isBlock('figureImage'),
          isBlock('caption')
        ),
        getStartBlock
      ),
      compose(
        both(
          isBlock('groupedFigure'),
          hasEmptyText
        ),
        getParentOf(getStartBlock)
      ),
      compose(
        both(
          isBlock('figureGroup'),
          n => n.nodes.size === 1
        ),
        getClosestOf(
          isBlock('figureGroup'),
          getStartBlock
        )
      )
    ]),
    converge(removeBlock, [
      getChange,
      getParentOf(getStartBlock),
      always({ url: '' })
    ])
  )
)

const onBackspace = onDeleteOrBackspace(
  always(undefined)
)

const onDelete = onDeleteOrBackspace(
  always(undefined)
)

export default eventHandler(
  compose(
    ifElse(isBackspace, onBackspace),
    ifElse(isDelete, onDelete)
  )(always(undefined))
)
