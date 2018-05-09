import { Block } from 'slate'
import { create as createCaption } from '../caption/data'

export const create = () =>
  Block.create({
    type: 'figure',
    nodes: [
      Block.create({
        type: 'figureImage',
        isVoid: true,
        data: {
          url: '',
          title: '',
          alt: ''
        }
      }),
      createCaption()
    ]
  })
