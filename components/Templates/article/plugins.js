import { LinkPlugin } from './link'
import FigurePlugin from './figure'
import CaptionPlugin from './caption'
import { MarksPlugin } from './marks'
import {
  ParagraphPlugin,
  SubheadPlugin
} from './blocks'
import TitleBlockPlugin from './titleBlock'

import {
  InfoboxPlugin,
  InfoboxTextPlugin,
  InfoboxTitlePlugin
} from './infoBox/plugins'

import { CenterPlugin } from './center'

export default [
  MarksPlugin,
  CenterPlugin,
  LinkPlugin,
  FigurePlugin,
  CaptionPlugin,
  ParagraphPlugin,
  SubheadPlugin,
  TitleBlockPlugin,
  InfoboxPlugin,
  InfoboxTextPlugin,
  InfoboxTitlePlugin
]
