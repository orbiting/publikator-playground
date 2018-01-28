import { when, isBlock } from './utils'

export const BlockElement = ({
  type,
  schema,
  component
}) => ({
  renderNode: when(
    ({ node }) => isBlock(type, node),
    component
  ),
  schema: {
    blocks: {
      [type]: schema || {}
    }
  }
})
