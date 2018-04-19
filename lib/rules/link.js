const { ifElse } = require('ramda')

const S = require('../transform/slate')
const M = require('../transform/mdast')
const { mergeResults } = require('../transform/common')

const fromMdast = ifElse(
  M.isLink,
  mergeResults(
    S.toInline('link'),
    S.withLinkData,
    S.withNodes
  )
)

const toMdast = ifElse(
  S.isInline('link'),
  mergeResults(M.toLink, M.withChildren)
)

module.exports = {
  fromMdast,
  toMdast
}
