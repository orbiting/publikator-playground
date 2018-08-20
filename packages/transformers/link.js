import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isLink,
  mergeResults(
    S.toInline('link'),
    S.withLinkData,
    S.withNodes
  )
)

const toMdast = ifElse(
  S.isInline('link'),
  mergeResults(M.toLink, M.withChildren)
)

export default {
  fromMdast,
  toMdast
}
