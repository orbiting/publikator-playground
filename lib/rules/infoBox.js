import { ifElse, compose } from 'ramda'
import S from '../transform/slate'
import M from '../transform/mdast'
import { mergeResults } from '../transform/common'
import {
  normalize,
  getOrNew,
  getOrSkip,
  getMany
} from '../transform/normalize'

import Figure from './figure'

const infoBoxTitleFromMdast = ifElse(
  M.isHeading(3),
  mergeResults(
    S.toBlock('infoBoxTitle'),
    S.withNodes
  )
)

const infoBoxTextFromMdast = ifElse(
  M.isParagraph,
  mergeResults(
    S.toBlock('infoBoxText'),
    S.withNodes
  )
)

const fromMdast = ifElse(
  M.isZone('INFOBOX'),
  mergeResults(
    S.toBlock('infoBox'),
    S.withData,
    S.withNormalizedNodes(
      normalize(
        getOrNew(
          S.toBlock('title'),
          infoBoxTitleFromMdast
        ),
        getOrSkip(Figure.fromMdast),
        getMany(infoBoxTextFromMdast)
      )
    )
  )
)

const toMdast = compose(
  ifElse(
    S.isBlock('infoBox'),
    mergeResults(
      M.toZone('INFOBOX'),
      M.withChildren
    )
  ),
  ifElse(
    S.isBlock('infoBoxTitle'),
    mergeResults(M.toHeading(3), M.withChildren)
  ),
  ifElse(
    S.isBlock('infoBoxText'),
    mergeResults(M.toParagraph, M.withChildren)
  )
)

export default {
  fromMdast,
  toMdast
}
