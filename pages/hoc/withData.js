import { updateData } from '../actions/slate'
import { connect } from 'react-redux'

const mapStateToProps = dataKey => (
  state,
  { editor, node }
) => ({
  value: (dataKey && node.data.get(dataKey)) || node.data,
  onChange: value => {
    editor.change(
      updateData,
      node,
      (dataKey && { [dataKey]: value }) || value
    )
  }
})

export default dataKey =>
  connect(mapStateToProps(dataKey), () => ({}))
