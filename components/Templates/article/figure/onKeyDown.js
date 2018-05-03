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

import { isBlock } from '../../../Editor/utils'

import {
  focusNext,
  focusPrevious,
  insertBlockAfter,
  removeBlock,
  updateData
} from '../../../Editor/actions/slate'

import {
  isMixed,
  hasEdgeInSelection,
  getChange,
  isCollapsed,
  getEndBlock,
  getNextBlockOf,
  getParentOf,
  getStartBlock,
  hasEmptyText,
  eventHandler,
  isEnter,
  isDelete,
  isBackspace,
  iSafePath
} from '../../../Editor/utils/foo'

import { newCaption } from '../caption/plugins'

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
      compose(focusNext, getChange),
      compose(
        focusNext,
        converge(insertBlockAfter, [
          getChange,
          newCaption,
          getEndBlock
        ])
      )
    )
  )
)(always(undefined))

// #TODO: clear image, empty element
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
    compose(
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
        ])
      ),
      ifElse(
        compose(
          both(isBlock('figure'), hasEmptyText),
          getParentOf(getStartBlock)
        ),
        converge(removeBlock, [
          getChange,
          getParentOf(getStartBlock),
          always({ url: '' })
        ])
      )
    )(compose(focusPrevious, getChange))
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
