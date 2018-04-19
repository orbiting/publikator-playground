const { ifElse, compose } = require('ramda')
const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')
const {
  normalize,
  getMany,
  getJust
} = require('../transform/normalize')

const Figure = require('./figure')
const Caption = require('./caption')

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

module.exports = {
  fromMdast,
  toMdast
}
