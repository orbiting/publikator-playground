const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isParagraph,
  mergeResults(
    S.toBlock('paragraph'),
    S.withNodes
  )
)

const toMdast = ifElse(
  S.isBlock('paragraph'),
  mergeResults(M.toParagraph, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
