import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    isSelected:
      !!state.ui.selectedNode &&
      state.ui.selectedNode === ownProps.node
  }
}

export default connect(mapStateToProps)
