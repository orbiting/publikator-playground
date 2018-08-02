import getNewGroupedFigure from '../groupedFigure/getNew'
import { Block } from 'slate'

export default () =>
  Block.create({
    type: 'figureGroup',
    nodes: [getNewGroupedFigure()]
  })
