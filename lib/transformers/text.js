import {
  ifElse,
  compose,
  always,
  split,
  intersperse,
  map,
  objOf
} from 'ramda'

import { safeProp } from '@orbiting/transform/common'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'

export default {
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
