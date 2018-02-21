import { when, isBlock, isMark, isInline } from './'
import Placeholder, {
  InlinePlaceholder
} from '../components/Placeholder'

export const renderBlock = (type, component) =>
  when(({ node }) => isBlock(type, node), component)

export const renderMark = (type, component) =>
  when(({ mark }) => isMark(type, mark), component)

export const renderInline = (type, component) =>
  when(({ node }) => isInline(type, node), component)

export const renderPlaceholder = (type, text) =>
  when(
    ({ node }) => isBlock(type, node) && !node.text,
    () => <Placeholder>{text}</Placeholder>
  )

export const renderInlinePlaceholder = (type, text) =>
  when(
    ({ node }) => isBlock(type, node) && !node.text,
    () => <InlinePlaceholder>{text}</InlinePlaceholder>
  )

export const withRelativeStyle = obj => ({
  style: { position: 'relative' },
  ...obj
})
