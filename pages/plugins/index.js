import { when, isBlock } from '../utils'
import Placeholder from '../components/Placeholder'

export const blockSchema = (type, schema) => ({
  schema: {
    blocks: {
      [type]: schema
    }
  }
})

export const renderBlock = (type, component) =>
  when(({ node }) => isBlock(type, node), component)

export const renderPlaceholder = (type, text) =>
  when(
    ({ node }) => isBlock(type, node) && !node.text,
    () => <Placeholder>{text}</Placeholder>
  )
