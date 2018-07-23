import { Block } from 'slate'
import { getNew as getNewFigure } from '../figure'

export const create = () =>
  Block.create({
    type: 'infoBox',
    nodes: [
      Block.create({
        type: 'infoBoxTitle'
      }),
      getNewFigure(),
      Block.create({
        type: 'infoBoxText'
      })
    ]
  })
