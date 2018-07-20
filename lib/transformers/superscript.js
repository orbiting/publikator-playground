import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isSup,
  mergeResults(S.toMark('sup'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('sup'),
  mergeResults(M.toSup, M.withChildren)
)

export default {
  fromMdast,
  toMdast
}
