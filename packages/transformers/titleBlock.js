import { ifElse, compose } from 'ramda'
import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'
import {
  normalize,
  getOrNew,
  getOrSkipAt
} from '@orbiting/transform/normalize'

const titleFromMdast = ifElse(
  M.isHeading(1),
  mergeResults(S.toBlock('title'), S.withNodes)
)

const leadFromMdast = ifElse(
  M.isParagraph,
  mergeResults(S.toBlock('lead'), S.withNodes)
)

const creditsFromMdast = ifElse(
  M.isParagraph,
  mergeResults(S.toBlock('credits'), S.withNodes)
)

const getNew = mergeResults(
  S.toBlock('titleBlock'),
  () => ({
    nodes: [
      S.toBlock('title')(),
      S.toBlock('lead')(),
      S.toBlock('credits')()
    ]
  })
)

const fromMdast = ifElse(
  M.isZone('TITLE'),
  mergeResults(
    S.toBlock('titleBlock'),
    S.withData,
    S.withNormalizedNodes(
      normalize(
        getOrNew(
          S.toBlock('title'),
          titleFromMdast
        ),
        getOrSkipAt(-1, leadFromMdast),
        getOrNew(
          S.toBlock('credits'),
          creditsFromMdast
        )
      )
    )
  )
)

const toMdast = compose(
  ifElse(
    S.isBlock('titleBlock'),
    mergeResults(
      M.toZone('TITLE'),
      M.withChildren
    )
  ),
  ifElse(
    S.isBlock('title'),
    mergeResults(M.toHeading(1), M.withChildren)
  ),
  ifElse(
    S.isBlock('lead'),
    mergeResults(M.toParagraph, M.withChildren)
  ),
  ifElse(
    S.isBlock('credits'),
    mergeResults(M.toParagraph, M.withChildren)
  )
)

export default {
  getNew,
  fromMdast,
  toMdast
}
