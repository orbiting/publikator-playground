import { ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'

const getNew = mergeResults(
  S.toBlock('figureImage'),
  S.asVoid,
  () => ({
    data: {
      url: '',
      title: '',
      alt: ''
    }
  })
)

const fromMdast = ifElse(
  M.isImageParagraph,
  mergeResults(S.withImageParagraphData, getNew)
)

const toMdast = ifElse(
  S.isBlock('figureImage'),
  M.toImageParagraph
)

export default {
  fromMdast,
  toMdast,
  getNew
}
