import { LinkPlugin } from './link'
import { ImagePlugin, FigurePlugin } from './figure/plugins'
import { CaptionPlugin } from './caption/plugins'
import { MarksPlugin } from './marks'
import { ParagraphPlugin, SubheadPlugin } from './blocks'
import {
  CreditsPlugin,
  TitlePlugin,
  LeadPlugin,
  TitleBlockPlugin
} from './titleBlock'

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
  ImagePlugin,
  ParagraphPlugin,
  SubheadPlugin,
  TitleBlockPlugin,
  CreditsPlugin,
  LeadPlugin,
  TitlePlugin,
  InfoboxPlugin,
  InfoboxTextPlugin,
  InfoboxTitlePlugin
]
