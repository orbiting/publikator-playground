import OptionGroup from '@orbiting/publikator-editor/components/SelectionPath/OptionGroup'
import { ParagraphButton } from '../paragraph/ui'
import { SubheadButton } from '../subhead/ui'
import { InsertFigureButton } from '../figure/ui'
import { InsertInfoBoxButton } from '../infoBox/ui'
import { SubButton } from '../subscript/ui'
import { SupButton } from '../superscript/ui'
import {
  DefaultSizeIcon,
  BreakoutSizeIcon,
  EdgeToEdgeSizeIcon,
  TinySizeIcon
} from './icons'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import ToggleButton from '@orbiting/publikator-editor/components/ToggleButton'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'

export const BlockButtons = ({
  node,
  editor
}) => (
  <OptionGroup label={'Block'}>
    <ParagraphButton
      node={node}
      editor={editor}
    />
    <SubheadButton node={node} editor={editor} />
  </OptionGroup>
)

export const InsertButtons = ({
  node,
  editor
}) => (
  <OptionGroup label={'Einfügen'}>
    <InsertFigureButton
      node={node}
      editor={editor}
    />
    <InsertInfoBoxButton
      node={node}
      editor={editor}
    />
  </OptionGroup>
)

export const TextButtons = ({ editor }) => (
  <OptionGroup label={'Text'}>
    <SupButton editor={editor} />
    <SubButton editor={editor} />
  </OptionGroup>
)

const withSize = withNodeData('size')

export const DefaultSizeButton = withSize(
  ({ value, onChange, ...props }) => {
    const active = value === null
    return (
      <ToggleButton
        active={active}
        disabled={active}
        onClick={() => onChange(null)}
        {...buttonStyles.iconButton}
        {...props}
      >
        <DefaultSizeIcon size={24} />
      </ToggleButton>
    )
  }
)

export const CenterSizeButton = withSize(
  ({ value, onChange, ...props }) => {
    const active = value === 'center'
    return (
      <ToggleButton
        active={active}
        disabled={active}
        onClick={() => onChange('center')}
        {...buttonStyles.iconButton}
        {...props}
      >
        <DefaultSizeIcon size={24} />
      </ToggleButton>
    )
  }
)

export const TinySizeButton = withSize(
  ({ value, onChange, ...props }) => {
    const active = value === 'tiny'
    return (
      <ToggleButton
        active={active}
        disabled={active}
        onClick={() => onChange('tiny')}
        {...buttonStyles.iconButton}
        {...props}
      >
        <TinySizeIcon size={24} />
      </ToggleButton>
    )
  }
)

export const BreakoutSizeButton = withSize(
  ({ value, onChange, ...props }) => {
    const active = value === 'breakout'
    return (
      <ToggleButton
        active={active}
        disabled={active}
        onClick={() => onChange('breakout')}
        {...buttonStyles.iconButton}
        {...props}
      >
        <BreakoutSizeIcon size={24} />
      </ToggleButton>
    )
  }
)

export const EdgeToEdgeSizeButton = withSize(
  ({ value, onChange, ...props }) => {
    const active = value === 'edgeToEdge'
    return (
      <ToggleButton
        active={active}
        disabled={active}
        onClick={() => onChange('edgeToEdge')}
        {...buttonStyles.iconButton}
        {...props}
      >
        <EdgeToEdgeSizeIcon size={24} />
      </ToggleButton>
    )
  }
)
