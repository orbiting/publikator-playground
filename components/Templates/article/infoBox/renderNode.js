import { compose, ifElse, always } from 'ramda'
import {
  InfoBox,
  InfoBoxTitle,
  InfoBoxText
} from '@project-r/styleguide'
import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'

import withRelativeStyle from '@orbiting/publikator-editor/styles/withRelativeStyle'

import {
  SizeButton,
  BreakoutLeftIcon,
  FloatLeftIcon,
  DefaultIcon
} from '../common/sizes'

import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'
import { TextButtons } from '../common/ui'

export default compose(
  ifElse(
    compose(
      isBlock('infoBox'),
      safeProp('node')
    ),
    ({ children, attributes, node, editor }) => [
      <SelectionPath.Options
        key="ui"
        node={node}
        offset={3}
      >
        <SelectionPath.OptionGroup label="Infobox Grösse">
          <SizeButton
            name={null}
            node={node}
            editor={editor}
          >
            <DefaultIcon />
          </SizeButton>
          <SizeButton
            name="breakout"
            node={node}
            editor={editor}
          >
            <BreakoutLeftIcon />
          </SizeButton>
          <SizeButton
            name="float"
            node={node}
            editor={editor}
          >
            <FloatLeftIcon />
          </SizeButton>
        </SelectionPath.OptionGroup>
      </SelectionPath.Options>,
      <InfoBox
        key="content"
        attributes={attributes}
        size={node.data.get('size')}
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
