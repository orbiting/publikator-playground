import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isSub,
  mergeResults(S.toMark('sub'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('sub'),
  mergeResults(M.toSub, M.withChildren)
)

export default {
  fromMdast,
  toMdast,
}
