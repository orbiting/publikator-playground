import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isParagraph,
  mergeResults(
    S.toBlock('paragraph'),
    S.withNodes
  )
)

const toMdast = ifElse(
  S.isBlock('paragraph'),
  mergeResults(M.toParagraph, M.withChildren)
)

export default {
  fromMdast,
  toMdast
}
