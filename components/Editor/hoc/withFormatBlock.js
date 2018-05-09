import { connect } from 'react-redux'
import { isBlock } from '../lib'
import { convertBlock } from '../actions/slate'

const defaultConversionStrategy = (
  change,
  node,
  type
) => node.set('type', type)

const mapStateToProps = (state, ownProps) => {
  const {
    editor,
    node,
    block,
    conversionStrategy = defaultConversionStrategy
  } = ownProps
  const active = isBlock(block, node)
  return {
    active,
    disabled: active,
    onClick: isActive => {
      return (
        !isActive &&
        editor.change(
          convertBlock,
          node,
          block,
          conversionStrategy
        )
      )
    }
  }
}

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
    conversionStrategy,
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
