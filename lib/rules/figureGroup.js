import { ifElse } from 'ramda'
import S from '../transform/slate'
import M from '../transform/mdast'
import { mergeResults } from '../transform/common'
import {
  normalize,
  getMany,
  getJust
} from '../transform/normalize'

import Figure from './figure'
import Caption from './caption'

const fromMdast = ifElse(
  M.isZone('FIGUREGROUP'),
  mergeResults(
    S.toBlock('figureGroup'),
    S.withNormalizedNodes(
      normalize(
        getMany(Figure.fromMdast),
        getJust(Caption.fromMdast)
      )
    )
  )
)

const toMdast = ifElse(
  S.isBlock('figureGroup'),
  mergeResults(
    M.toZone('FIGUREGROUP'),
    M.withChildren
  )
)

export default {
  fromMdast,
  toMdast
}
