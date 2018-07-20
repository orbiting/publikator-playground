import { ifElse, compose } from 'ramda'

import S from '../transform/slate'
import M from '../transform/mdast'
import { mergeResults } from '../transform/common'
import {
  normalize,
  getOrSkip,
  getMany,
  getOrNew
} from '../transform/normalize'

import Figure from './figure'
import TitleBlock from './titleBlock'
import Center from './center'

const fromMdast = ifElse(
  M.isRoot,
  mergeResults(
    S.toObject('document'),
    S.withNormalizedNodes(
      normalize(
        getOrSkip(Figure.fromMdast),
        getOrNew(
          TitleBlock.getNew,
          TitleBlock.fromMdast
        ),
        getMany(
          compose(
            Figure.fromMdast,
            Center.fromMdast
          )
        )
      )
    ),
    node => ({
      data: node.meta
    })
  )
)

const toMdast = ifElse(
  S.isDocument,
  mergeResults(M.toRoot, M.withChildren)
)

export default {
  fromMdast,
  toMdast
}
