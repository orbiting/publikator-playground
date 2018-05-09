import {
  compose,
  ifElse,
  always,
  both
} from 'ramda'
import {
  InfoBox,
  InfoBoxTitle,
  InfoBoxText
} from '@project-r/styleguide'

import withRelativeStyle from '../../../Editor/styles/withRelativeStyle'
import Placeholder from '../../../Editor/components/Placeholder'

import {
  safeProp,
  isBlock,
  hasEmptyText
} from '../../../Editor/lib'

import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'
import { TextButtons } from '../common/ui'

import PropertyForm from '../../../Editor/components/PropertyForm'

export const renderNode = compose(
  ifElse(
    compose(isBlock('infoBox'), safeProp('node')),
    ({ node, children, attributes }) => [
      <PropertyForm
        key="ui"
        node={node}
        offset={2}
      >
        Infobox
      </PropertyForm>,
      <InfoBox
        key="content"
        attributes={attributes}
      >
        {children}
      </InfoBox>
    ]
  ),
  ifElse(
    compose(
      isBlock('infoBoxTitle'),
      safeProp('node')
    ),
    ({ node, editor, children, attributes }) => [
      <PropertyForm key="ui" node={node}>
        <TextButtons editor={editor} />
      </PropertyForm>,
      <InfoBoxTitle
        key="content"
        attributes={withRelativeStyle(attributes)}
      >
        {children}
      </InfoBoxTitle>
    ]
  ),
  ifElse(
    compose(
      isBlock('infoBoxText'),
      safeProp('node')
    ),
    ({ node, children, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <BoldButton editor={editor} />
        <LinkButton editor={editor} />
        <TextButtons editor={editor} />
      </PropertyForm>,
      <InfoBoxText
        key="content"
        attributes={withRelativeStyle(attributes)}
      >
        {children}
      </InfoBoxText>
    ]
  )
)(always(undefined))

export const renderPlaceholder = compose(
  ifElse(
    compose(
      both(isBlock('infoBoxTitle'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Titel</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('infoBoxText'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Text...</Placeholder>
  )
)(always(undefined))