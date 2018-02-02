import { connect } from 'react-redux'

import { isBlock, typeOrTypeProp } from '../utils'
import { convertBlock } from '../actions/slate'

const defaultConversionStrategy = (change, node, block) =>
  node.set('type', typeOrTypeProp(block))

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
  // eslint-disable-next-line
  { editor, node, block, conversionStrategy, ...ownProps }
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
