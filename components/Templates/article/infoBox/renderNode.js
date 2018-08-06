import { compose, ifElse, always } from 'ramda'

import NoImageIcon from 'react-icons/lib/fa/check'
import HasImageIcon from 'react-icons/lib/fa/check-circle'

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
import SetValueButton from '@orbiting/publikator-editor/components/SetValueButton'
import ToggleButton from '@orbiting/publikator-editor/components/ToggleButton'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'

import withRelativeStyle from '@orbiting/publikator-editor/styles/withRelativeStyle'
import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import {
  removeBlock,
  insertBlockAfter
} from '@orbiting/publikator-editor/changes'

import getNewFigure from '../infoBoxFigure/getNew'

import {
  BreakoutLeftIcon,
  FloatLeftIcon,
  DefaultIcon
} from '../common/breakouts'

import {
  TinyIcon,
  SmallIcon,
  MediumIcon,
  LargeIcon
} from '../common/sizes'

import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'
import { TextButtons } from '../common/ui'

const BreakoutButton = withNodeData('size')(
  SetValueButton
)

const FigureSizeButton = withNodeData(
  'figureSize'
)(SetValueButton)

const FigureToggleButton = ({ node, editor }) => {
  const figure = node.nodes.get(1)
  const hasFigure = isBlock(
    'infoBoxFigure',
    figure
  )
  const Icon = hasFigure
    ? HasImageIcon
    : NoImageIcon
  return (
    <ToggleButton
      active={hasFigure}
      {...buttonStyles.iconButton}
      onClick={isActive =>
        isActive
          ? editor.change(removeBlock, figure)
          : editor.change(
              insertBlockAfter,
              getNewFigure(),
              node.nodes.first()
            )
      }
    >
      <Icon size={22} />
    </ToggleButton>
  )
}

export default compose(
  ifElse(
    compose(
      isBlock('infoBox'),
      safeProp('node')
    ),
    ({ children, attributes, node, editor }) => {
      const figure = node.nodes.get(1)
      const hasFigure = isBlock(
        'infoBoxFigure',
        figure
      )
      const infoBoxSize = node.data.get('size')

      return [
        <SelectionPath.Options
          key="ui"
          node={node}
          offset={3}
        >
          <SelectionPath.OptionGroup label="Ausrichtung">
            <BreakoutButton
              name={null}
              node={node}
              {...buttonStyles.iconButton}
              editor={editor}
            >
              <DefaultIcon />
            </BreakoutButton>
            <BreakoutButton
              name="breakout"
              node={node}
              {...buttonStyles.iconButton}
              editor={editor}
            >
              <BreakoutLeftIcon />
            </BreakoutButton>
            <BreakoutButton
              name="float"
              node={node}
              {...buttonStyles.iconButton}
              editor={editor}
            >
              <FloatLeftIcon />
            </BreakoutButton>
          </SelectionPath.OptionGroup>

          <SelectionPath.OptionGroup label="Mit Bild">
            <FigureToggleButton
              node={node}
              editor={editor}
            />
          </SelectionPath.OptionGroup>

          {hasFigure && (
            <SelectionPath.OptionGroup label="Bildgrösse">
              <FigureSizeButton
                name={null}
                node={node}
                {...buttonStyles.iconButton}
                editor={editor}
              >
                <LargeIcon />
              </FigureSizeButton>
              <FigureSizeButton
                name="M"
                node={node}
                {...buttonStyles.iconButton}
                editor={editor}
              >
                <MediumIcon />
              </FigureSizeButton>
              {infoBoxSize !== 'float' && [
                <FigureSizeButton
                  key="small-button"
                  name="S"
                  node={node}
                  {...buttonStyles.iconButton}
                  editor={editor}
                >
                  <SmallIcon />
                </FigureSizeButton>,
                <FigureSizeButton
                  key="tiny-button"
                  name="XS"
                  node={node}
                  {...buttonStyles.iconButton}
                  editor={editor}
                >
                  <TinyIcon />
                </FigureSizeButton>
              ]}
            </SelectionPath.OptionGroup>
          )}
        </SelectionPath.Options>,
        <InfoBox
          key="content"
          attributes={attributes}
          size={node.data.get('size')}
          figureSize={node.data.get('figureSize')}
        >
          {children}
        </InfoBox>
      ]
    }
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
