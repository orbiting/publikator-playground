import { Block } from 'slate'
import { create as createFigure } from '../figure/data'

export const create = () =>
  Block.create({
    type: 'infoBox',
    nodes: [
      Block.create({
        type: 'infoBoxTitle'
      }),
      createFigure(),
      Block.create({
        type: 'infoBoxText'
      })
    ]
  })
