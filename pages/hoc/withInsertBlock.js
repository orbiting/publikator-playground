import { connect } from 'react-redux'
import { callOrJust } from '../utils'
import {
  insertBlock,
  insertBlockAfter
} from '../actions/slate'

const mapStateToProps = (
  state,
  { editor, block, node, insertAfter }
) => ({
  onClick: insertAfter
    ? () =>
        editor.change(
          insertBlockAfter,
          callOrJust(block),
          node
        )
    : () => editor.change(insertBlock, callOrJust(block))
})

const mergeProps = (
  stateProps,
  dispatchProps,
  // eslint-disable-next-line
  { editor, node, block, insertAfter, ...ownProps }
) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
})

export default connect(
  mapStateToProps,
  /* empty */ () => ({}),
  mergeProps
)
