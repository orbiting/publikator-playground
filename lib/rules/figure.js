import { ifElse, compose } from 'ramda'

import {
  normalize,
  getJust,
  getOrNew
} from '../transform/normalize'

import S from '../transform/slate'
import M from '../transform/mdast'
import { mergeResults } from '../transform/common'

import Caption from './caption'

const getNewFigureImage = mergeResults(
  S.toBlock('figureImage'),
  S.asVoid,
  () => ({
    data: {
      url: '',
      title: '',
      alt: ''
    }
  })
)

const figureImageFromMdast = ifElse(
  M.isImageParagraph,
  mergeResults(
    S.withImageParagraphData,
    getNewFigureImage
  )
)

const fromMdast = ifElse(
  M.isZone('FIGURE'),
  mergeResults(
    S.toBlock('figure'),
    S.withData,
    S.withNormalizedNodes(
      normalize(
        getOrNew(
          getNewFigureImage,
          figureImageFromMdast
        ),
        getJust(Caption.fromMdast)
      )
    )
  )
)

const toMdast = compose(
  ifElse(
    S.isBlock('figure'),
    mergeResults(
      M.toZone('FIGURE'),
      M.withChildren
    )
  ),
  ifElse(
    S.isBlock('figureImage'),
    M.toImageParagraph
  )
)

export default {
  fromMdast,
  toMdast
}
