import { connect } from 'react-redux'

const mapStateToProps = (state, { offset, node }) => {
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

export default connect(mapStateToProps)
