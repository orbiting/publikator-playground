import { connect } from 'react-redux'

const mapStateToProps = (
  state,
  { offset, node }
) => {
  return {
    isSelected:
      !!state.ui.selectedNode &&
      (state.ui.selectedNode.key === node.key ||
        state.ui.selectionPath
          .skipLast(1)
          .takeLast(offset)
          .some(n => n.key === node.key))
  }
}

const mergeProps = (
  stateProps,
  dispatchProps,
  // eslint-disable-next-line
  { offset, node, ...ownProps }
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
