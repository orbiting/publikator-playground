import { Block } from 'slate'
import onKeyDown from './onKeyDown'
import renderNode from './renderNode'

import Caption from '../caption'
import FigureImage from '../figureImage'

export const getNew = () =>
  Block.create({
    type: 'figure',
    nodes: [
      Caption.getNew(),
      FigureImage.getNew()
    ]
  })

export default {
  renderNode,
  onKeyDown,
  getNew
}
