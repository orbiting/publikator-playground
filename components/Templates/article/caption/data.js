import { Block } from 'slate'

export const create = () =>
  Block.create({
    type: 'caption',
    nodes: [
      Block.create({
        type: 'captionText'
      }),
      Block.create({
        type: 'captionByline'
      })
    ]
  })
