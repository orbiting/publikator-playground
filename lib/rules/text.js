const {
  ifElse,
  compose,
  always,
  split,
  intersperse,
  map,
  objOf
} = require('ramda')

const { safeProp } = require('../transform/common')

const S = require('../transform/slate')
const M = require('../transform/mdast')

module.exports = {
  fromMdast: compose(
    ifElse(M.isText, S.toText),
    ifElse(
      M.isBreak,
      compose(S.toText, always({ value: '\n' }))
    )
  ),
  toMdast: ifElse(
    S.isText,
    compose(
      intersperse(M.toBreak()),
      map(compose(M.toText, objOf('value'))),
      split('\n'),
      safeProp('value')
    )
  )
}
