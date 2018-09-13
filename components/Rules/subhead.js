import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isHeading(2),
  mergeResults(S.toBlock('subhead'), S.withNodes)
)

const toMdast = ifElse(
  S.isBlock('subhead'),
  mergeResults(M.toHeading(2), M.withChildren)
)

export default {
  fromMdast,
  toMdast,
}
