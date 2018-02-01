import { updateData } from '../actions/slate'
import { connect } from 'react-redux'

const mapStateToProps = dataKey => (
  state,
  { editor, node }
) => ({
  value: node.data.get(dataKey),
  onClick: value =>
    editor.change(updateData, node, { [dataKey]: value })
})

export default dataKey =>
  connect(mapStateToProps(dataKey), () => ({}))
