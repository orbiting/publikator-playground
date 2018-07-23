import { Block } from 'slate'
import { onKeyDown } from './handlers'
import { renderNode } from './renderers'

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
