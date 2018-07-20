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

import withRelativeStyle from '@orbiting/publikator-editor/styles/withRelativeStyle'
import Placeholder from '@orbiting/publikator-editor/components/Placeholder'

import {
  safeProp,
  isBlock,
  hasEmptyText
} from '@orbiting/publikator-editor/lib'

import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'
import { TextButtons } from '../common/ui'

import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

export const renderNode = compose(
  ifElse(
    compose(isBlock('infoBox'), safeProp('node')),
    ({ children, attributes }) => [
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
      <SelectionPath.Options key="ui" node={node}>
        <TextButtons editor={editor} />
      </SelectionPath.Options>,
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
      <SelectionPath.Options
        key="ui"
        offset={1}
        node={node}
      >
        <SelectionPath.OptionGroup label="Format">
          <BoldButton editor={editor} />
          <LinkButton editor={editor} />
        </SelectionPath.OptionGroup>
        <TextButtons editor={editor} />
      </SelectionPath.Options>,
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
