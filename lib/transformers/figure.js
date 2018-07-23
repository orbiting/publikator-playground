import {
  ifElse,
  compose,
  objOf,
  when,
  either,
  isNil,
  complement,
  equals,
  always
} from 'ramda'

import {
  normalize,
  getJust,
  getOrNew
} from '@orbiting/transform/normalize'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import {
  mergeResults,
  safeProp
} from '@orbiting/transform/common'

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
    compose(
      objOf('size'),
      when(
        either(
          isNil,
          complement(equals('breakout'))
        ),
        always(null)
      ),
      safeProp('size')
    ),
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
