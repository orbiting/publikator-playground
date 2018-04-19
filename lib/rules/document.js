const { ifElse, compose } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')
const {
  normalize,
  getOrSkip,
  getMany,
  getOrNew
} = require('../transform/normalize')

const Figure = require('./figure')
const TitleBlock = require('./titleBlock')
const Center = require('./center')

const fromMdast = ifElse(
  M.isRoot,
  mergeResults(
    S.toObject('document'),
    S.withNormalizedNodes(
      normalize(
        getOrSkip(Figure.fromMdast),
        getOrNew(
          TitleBlock.getNewTitleBlock,
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

module.exports = {
  fromMdast,
  toMdast
}
