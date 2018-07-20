import { ifElse, compose } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'
import {
  normalize,
  getOrSkip,
  getMany,
  getOrNew
} from '@orbiting/transform/normalize'

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
