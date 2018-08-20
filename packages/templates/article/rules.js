import { compose } from 'ramda'

import Bold from '@orbiting/publikator-transformers/bold'
import Italic from '@orbiting/publikator-transformers/italic'
import Center from '@orbiting/publikator-transformers/center'
import Document from '@orbiting/publikator-transformers/document'
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

export default {
  fromMdast: compose(
    Bold.fromMdast,
    Italic.fromMdast,
    Center.fromMdast,
    Document.fromMdast,
    Figure.fromMdast,
    Link.fromMdast,
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
    Document.toMdast,
    Figure.toMdast,
    Link.toMdast,
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
