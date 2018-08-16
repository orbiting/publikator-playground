import React, { Fragment } from 'react'
import { FaInfo as InfoBoxIcon } from 'react-icons/fa'

import { Label } from '@project-r/styleguide'
import InsertBlockButton from '@orbiting/publikator-editor/components/InsertBlockButton'

import getNew from './getNew'

import { FaClose as NoImageIcon } from 'react-icons/fa'
import { FaCheck as HasImageIcon } from 'react-icons/fa'

import { isBlock } from '@orbiting/publikator-editor/lib'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import SetValueButton from '@orbiting/publikator-editor/components/SetValueButton'
import ToggleButton from '@orbiting/publikator-editor/components/ToggleButton'
import { withNodeData } from '@orbiting/publikator-editor/apps/nodeData'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

import {
  removeBlock,
  insertBlockAfter,
} from '@orbiting/publikator-editor/changes'

import getNewFigure from '../infoBoxFigure/getNew'

import {
  BreakoutLeftIcon,
  FloatLeftIcon,
  DefaultIcon,
} from '../common/breakouts'

import {
  TinyIcon,
  SmallIcon,
  MediumIcon,
  LargeIcon,
} from '../common/sizes'

import { BoldButton } from '../bold/ui'
import { LinkButton } from '../link/ui'
import { TextButtons } from '../common/ui'

export const InsertInfoBoxButton = withTheme()(
  props => (
    <InsertBlockButton
      block={getNew}
      {...props}
      {...props.styles.buttons.iconButton}
    >
      <InfoBoxIcon size={22} />
    </InsertBlockButton>
  )
)

const BreakoutButton = withNodeData({
  fieldName: 'size',
})(SetValueButton)

const FigureSizeButton = withNodeData({
  fieldName: 'figureSize',
})(SetValueButton)

const FigureToggleButton = withTheme()(
  ({ node, editor, styles }) => {
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
        {...styles.buttons.iconButton}
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
)

export const InfoBoxUI = withTheme()(
  ({ node, editor, styles }) => {
    const figure = node.nodes.get(1)
    const hasFigure = isBlock(
      'infoBoxFigure',
      figure
    )
    const infoBoxSize = node.data.get('size')

    return (
      <SelectionPath.Selected
        node={node}
        offset={3}
      >
        <div {...styles.layout.container}>
          <div {...styles.layout.sectionHeader}>
            <Label>Ausrichtung</Label>
          </div>
          <div {...styles.layout.actions}>
            <BreakoutButton
              name={null}
              node={node}
              {...styles.buttons.iconButton}
              editor={editor}
            >
              <DefaultIcon />
            </BreakoutButton>
            <BreakoutButton
              name="breakout"
              node={node}
              {...styles.buttons.iconButton}
              editor={editor}
            >
              <BreakoutLeftIcon />
            </BreakoutButton>
            <BreakoutButton
              name="float"
              node={node}
              {...styles.buttons.iconButton}
              editor={editor}
            >
              <FloatLeftIcon />
            </BreakoutButton>
          </div>
        </div>

        <div {...styles.layout.container}>
          <div {...styles.layout.sectionHeader}>
            <Label>Mit Bild?</Label>
          </div>
          <div {...styles.layout.actions}>
            <FigureToggleButton
              node={node}
              editor={editor}
            />
          </div>
        </div>

        {hasFigure && (
          <div {...styles.layout.container}>
            <div {...styles.layout.sectionHeader}>
              <Label>Mit Bild?</Label>
            </div>
            <div {...styles.layout.actions}>
              <FigureSizeButton
                name={null}
                node={node}
                {...styles.buttons.iconButton}
                editor={editor}
              >
                <LargeIcon />
              </FigureSizeButton>
              <FigureSizeButton
                name="M"
                node={node}
                {...styles.buttons.iconButton}
                editor={editor}
              >
                <MediumIcon />
              </FigureSizeButton>
              {infoBoxSize !== 'float' && (
                <Fragment>
                  <FigureSizeButton
                    key="small-button"
                    name="S"
                    node={node}
                    {...styles.buttons.iconButton}
                    editor={editor}
                  >
                    <SmallIcon />
                  </FigureSizeButton>
                  ,
                  <FigureSizeButton
                    key="tiny-button"
                    name="XS"
                    node={node}
                    {...styles.buttons.iconButton}
                    editor={editor}
                  >
                    <TinyIcon />
                  </FigureSizeButton>
                </Fragment>
              )}
            </div>
          </div>
        )}
      </SelectionPath.Selected>
    )
  }
)

export const InfoBoxTitleUI = ({
  node,
  editor,
}) => (
  <SelectionPath.Selected node={node}>
    <TextButtons editor={editor} />
  </SelectionPath.Selected>
)

export const InfoBoxTextUI = withTheme()(
  ({ node, editor, styles }) => (
    <SelectionPath.Selected
      offset={1}
      node={node}
    >
      <div {...styles.layout.container}>
        <div {...styles.layout.sectionHeader}>
          <Label>Format</Label>
        </div>
        <div {...styles.layout.actions}>
          <BoldButton editor={editor} />
          <LinkButton editor={editor} />
        </div>
      </div>
      <TextButtons editor={editor} />
    </SelectionPath.Selected>
  )
)
