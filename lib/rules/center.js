const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isZone('CENTER'),
  mergeResults(S.toBlock('center'), S.withNodes)
)

const toMdast = ifElse(
  S.isBlock('center'),
  mergeResults(M.toZone('CENTER'), M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
