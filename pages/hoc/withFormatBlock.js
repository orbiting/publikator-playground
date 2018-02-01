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
  const onClick = isActive => {
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

  const active = isBlock(block, node)
  const disabled = active
  return {
    active,
    disabled,
    onClick
  }
}

export default connect(mapStateToProps, () => ({}))
