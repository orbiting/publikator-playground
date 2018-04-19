const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isEmphasis,
  mergeResults(S.toBlock('italic'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('italic'),
  mergeResults(M.toEmphasis, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
