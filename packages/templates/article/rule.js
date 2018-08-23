import { compose, ifElse } from 'ramda'

import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import { mergeResults } from '@orbiting/transform/common'
import {
  normalize,
  getOrSkip,
  getMany,
  getOrNew,
} from '@orbiting/transform/normalize'

import Bold from '@orbiting/publikator-transformers/bold'
import Italic from '@orbiting/publikator-transformers/italic'
import Center from '@orbiting/publikator-transformers/center'
import Figure from '@orbiting/publikator-transformers/figure'
import Link from '@orbiting/publikator-transformers/link'
import Paragraph from '@orbiting/publikator-transformers/paragraph'
import Subhead from '@orbiting/publikator-transformers/subhead'
import Subscript from '@orbiting/publikator-transformers/subscript'
import Superscript from '@orbiting/publikator-transformers/superscript'
import Text from '@orbiting/publikator-transformers/text'
import TitleBlock from '@orbiting/publikator-transformers/titleBlock'
import InfoBox from '@orbiting/publikator-transformers/infoBox'
import Caption from '@orbiting/publikator-transformers/caption'
import HTML from '@orbiting/publikator-transformers/html'
import FigureGroup from '@orbiting/publikator-transformers/figureGroup'
import Cover from '@orbiting/publikator-transformers/cover'
import FigureImage from '@orbiting/publikator-transformers/figureImage'
import List from '@orbiting/publikator-transformers/list'

const articleFromMdast = ifElse(
  M.isRoot,
  mergeResults(
    S.toObject('document'),
    S.withNormalizedNodes(
      normalize(
        getOrSkip(Cover.fromMdast),
        getOrNew(
          TitleBlock.getNew,
          TitleBlock.fromMdast
        ),
        getMany(
          compose(
            Figure.fromMdast,
            Center.fromMdast
          )
        )
      )
    ),
    node => ({
      data: node.meta,
    })
  )
)

const articleToMdast = ifElse(
  S.isDocument,
  mergeResults(M.toRoot, M.withChildren)
)

export default {
  fromMdast: compose(
    Bold.fromMdast,
    Italic.fromMdast,
    Center.fromMdast,
    articleFromMdast,
    Figure.fromMdast,
    Link.fromMdast,
    List.fromMdast,
    Paragraph.fromMdast,
    Subhead.fromMdast,
    Subscript.fromMdast,
    Superscript.fromMdast,
    Text.fromMdast,
    InfoBox.fromMdast,
    HTML.fromMdast,
    FigureGroup.fromMdast
  ),
  toMdast: compose(
    Bold.toMdast,
    Italic.toMdast,
    Center.toMdast,
    articleToMdast,
    Figure.toMdast,
    Link.toMdast,
    List.fromMdast,
    Paragraph.toMdast,
    Subhead.toMdast,
    Subscript.toMdast,
    Superscript.toMdast,
    Text.toMdast,
    TitleBlock.toMdast,
    Caption.toMdast,
    InfoBox.toMdast,
    HTML.toMdast,
    Cover.toMdast,
    FigureImage.toMdast,
    FigureGroup.toMdast
  ),
}
