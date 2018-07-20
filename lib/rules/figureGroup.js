import {
  ifElse,
  compose,
  min,
  max,
  defaultTo,
  objOf,
  complement,
  equals,
  isNil,
  when,
  both,
  always
} from 'ramda'
import S from '../transform/slate'
import M from '../transform/mdast'
import {
  mergeResults,
  safeProp
} from '../transform/common'
import {
  normalize,
  getMany,
  getJust
} from '../transform/normalize'

import Figure from './figure'
import Caption from './caption'

const fromMdast = ifElse(
  M.isZone('FIGUREGROUP'),
  mergeResults(
    S.toBlock('figureGroup'),
    compose(
      objOf('data'),
      mergeResults(
        compose(
          objOf('columns'),
          min(4),
          max(2),
          defaultTo(2),
          safeProp('columns')
        ),
        compose(
          objOf('size'),
          when(
            both(
              isNil,
              complement(equals('breakout'))
            ),
            always(null)
          ),
          safeProp('size')
        )
      ),
      safeProp('data')
    ),
    S.withNormalizedNodes(
      normalize(
        getMany(Figure.fromMdast),
        getJust(Caption.fromMdast)
      )
    )
  )
)

const toMdast = ifElse(
  S.isBlock('figureGroup'),
  mergeResults(
    M.toZone('FIGUREGROUP'),
    M.withChildren
  )
)

export default {
  fromMdast,
  toMdast
}
