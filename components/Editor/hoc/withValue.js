import { Value } from 'slate'
import { resetKeyGenerator } from 'slate'
import { connect } from 'react-redux'
import { change } from '../actions/redux'

resetKeyGenerator()

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
