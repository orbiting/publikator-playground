import { Center } from '@project-r/styleguide'
import { renderBlock } from '../../Editor/utils/renderers'

export const CENTER = 'center'
export const CENTER_ZONE = 'CENTER'

export const CenterPlugin = {
  renderNode: renderBlock(
    CENTER,
    ({ attributes, children }) => (
      <Center {...attributes}>{children}</Center>
    )
  )
}
