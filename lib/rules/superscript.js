const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isSup,
  mergeResults(S.toMark('sup'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('sup'),
  mergeResults(M.toSup, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
