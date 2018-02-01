import { connect } from 'react-redux'

const mapStateToProps = state => ({
  selectionPath: state.ui.selectionPath,
  selectedNode: state.ui.selectedNode
})

export default connect(mapStateToProps)
