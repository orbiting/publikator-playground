import {
  compose,
  equals,
  complement,
  converge,
  both,
  ifElse,
  either,
  always
} from 'ramda'

import {
  focusNext,
  focusPrevious,
  insertBlockAfter,
  updateData
} from '@orbiting/publikator-editor/actions/slate'

import {
  isMixed,
  hasEdgeInSelection,
  getChange,
  isCollapsed,
  getEndBlock,
  getNextBlockOf,
  getStartBlock,
  eventHandler,
  isEnter,
  isDelete,
  isBackspace,
  iSafePath,
  isBlock
} from '@orbiting/publikator-editor/lib'

import Caption from '../caption'

const onEnter = compose(
  ifElse(
    both(
      isMixed,
      hasEdgeInSelection([isBlock('figureImage')])
    ),
    compose(
      change => change.collapseToEnd(),
      getChange
    )
  ),
  ifElse(
    both(
      isCollapsed,
      compose(
        isBlock('figureImage'),
        getStartBlock
      )
    ),
    ifElse(
      compose(
        either(
          isBlock('captionText'),
          isBlock('captionByline')
        ),
        getNextBlockOf(getStartBlock)
      ),
      compose(
        focusNext,
        getChange
      ),
      compose(
        focusNext,
        converge(insertBlockAfter, [
          getChange,
          Caption.getNew,
          getEndBlock
        ])
      )
    )
  )
)(always(undefined))

const onDeleteOrBackspace = compose(
  ifElse(
    both(
      isMixed,
      hasEdgeInSelection([isBlock('figureImage')])
    ),
    compose(
      change => change.collapseToStart(),
      getChange
    )
  ),
  ifElse(
    both(
      isCollapsed,
      compose(
        isBlock('figureImage'),
        getStartBlock
      )
    ),
    ifElse(
      compose(
        complement(equals('')),
        iSafePath(['data', 'url']),
        getStartBlock
      ),
      converge(updateData, [
        getChange,
        getStartBlock,
        always({ url: '' })
      ]),
      compose(
        focusPrevious,
        getChange
      )
    )()
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
    ifElse(isEnter, onEnter),
    ifElse(isBackspace, onBackspace),
    ifElse(isDelete, onDelete)
  )(always(undefined))
)
