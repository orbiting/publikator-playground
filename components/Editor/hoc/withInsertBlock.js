import { connect } from 'react-redux'
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
          block(),
          node
        )
    : () => editor.change(insertBlock, block())
})

const mergeProps = (
  stateProps,
  dispatchProps,
  {
    // eslint-disable-next-line
    editor,
    // eslint-disable-next-line
    node,
    // eslint-disable-next-line
    block,
    // eslint-disable-next-line
    insertAfter,
    ...ownProps
  }
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
