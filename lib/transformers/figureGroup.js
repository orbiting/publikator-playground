import {
  ifElse,
  compose,
  objOf,
  when,
  either,
  isNil,
  complement,
  equals,
  always,
  min,
  max,
  defaultTo
} from 'ramda'

import {
  normalize,
  getJust,
  getOrNew,
  getMany
} from '@orbiting/transform/normalize'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import {
  mergeResults,
  safeProp
} from '@orbiting/transform/common'
import Caption from './caption'
import FigureImage from './figureImage'

const groupedFigureFromMdast = ifElse(
  M.isZone('FIGURE'),
  mergeResults(
    S.toBlock('groupedFigure'),
    always({ data: {} }),
    S.withNormalizedNodes(
      normalize(
        getOrNew(
          FigureImage.getNew,
          FigureImage.fromMdast
        ),
        getJust(Caption.fromMdast)
      )
    )
  )
)

const groupedFigureToMdast = ifElse(
  S.isBlock('groupedFigure'),
  mergeResults(M.toZone('FIGURE'), M.withChildren)
)

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
            either(
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
        getMany(groupedFigureFromMdast),
        getJust(Caption.fromMdast)
      )
    )
  )
)

const toMdast = compose(
  ifElse(
    S.isBlock('figureGroup'),
    mergeResults(
      M.toZone('FIGUREGROUP'),
      M.withChildren
    )
  ),
  groupedFigureToMdast
)

export default {
  fromMdast,
  toMdast
}
