const { ifElse, compose } = require('ramda')

const {
  normalize,
  getJust,
  getOrNew
} = require('../transform/normalize')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const {
  mergeResults
} = require('../transform/common')

const Caption = require('./caption')

const getNewFigureImage = mergeResults(
  S.toBlock('figureImage'),
  S.asVoid,
  () => ({
    data: {
      url: null,
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

module.exports = {
  fromMdast,
  toMdast
}
