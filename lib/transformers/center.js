import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isZone('CENTER'),
  mergeResults(S.toBlock('center'), S.withNodes)
)

const toMdast = ifElse(
  S.isBlock('center'),
  mergeResults(M.toZone('CENTER'), M.withChildren)
)

export default {
  fromMdast,
  toMdast
}
