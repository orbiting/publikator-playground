const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isSub,
  mergeResults(S.toMark('sub'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('sub'),
  mergeResults(M.toSub, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
