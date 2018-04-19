const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isHeading(2),
  mergeResults(S.toBlock('subhead'), S.withNodes)
)

const toMdast = ifElse(
  S.isBlock('subhead'),
  mergeResults(M.toHeading(2), M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
