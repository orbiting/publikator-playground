import { ifElse } from 'ramda'
import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const fromMdast = ifElse(
  M.isStrong,
  mergeResults(S.toMark('bold'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('bold'),
  mergeResults(M.toStrong, M.withChildren)
)

export default {
  fromMdast,
  toMdast,
}
