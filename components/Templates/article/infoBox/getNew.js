import { Block } from 'slate'
import getNewFigure from '../infoBoxFigure/getNew'

export default () =>
  Block.create({
    type: 'infoBox',
    nodes: [
      Block.create({
        type: 'infoBoxTitle',
      }),
      getNewFigure(),
      Block.create({
        type: 'infoBoxText',
      }),
    ],
  })
