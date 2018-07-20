import { Value } from 'slate'
import { connect } from 'react-redux'
import { change } from '../actions/redux'

const mapStateToProps = (
  { value: valueFromState },
  { initialValue }
) => {
  const value = valueFromState || initialValue
  return {
    value: Value.isValue(value)
      ? value
      : Value.fromJSON(value)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: t => {
      dispatch(change(t))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
