const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const {
  mergeResults
} = require('../transform/common')

const fromMdast = ifElse(
  M.isStrong,
  mergeResults(S.toMark('bold'), S.withNodes)
)

const toMdast = ifElse(
  S.isMark('bold'),
  mergeResults(M.toStrong, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
