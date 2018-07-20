import { FigureGroup } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '../../../Editor/lib'
import SelectionPath from '../../../Editor/components/SelectionPath'
import RadioButton from '../../../Editor/components/RadioButton'
import withNodeData from '../../../Editor/hoc/withNodeData'

const FigureGroupForm = withNodeData('size')(
  ({ value, onChange }) => {
    return (
      <div>
        <RadioButton
          name="figureGroupSize"
          value=""
          label="Default"
          checked={value === null}
          onChange={v =>
            onChange((!!v && v) || null)
          }
        />
        <RadioButton
          name="figureGroupSize"
          value="breakout"
          label="Breakout"
          checked={value === 'breakout'}
          onChange={onChange}
        />
      </div>
    )
  }
)

export default {
  renderNode: ifElse(
    compose(
      isBlock('figureGroup'),
      safeProp('node')
    ),
    ({ children, attributes, node, editor }) => {
      console.log(node.data)
      return [
        <SelectionPath.Options
          offset={3}
          key="ui"
          node={node}
        >
          <SelectionPath.OptionGroup label="Bildergruppe">
            <FigureGroupForm
              node={node}
              editor={editor}
            />
          </SelectionPath.OptionGroup>
        </SelectionPath.Options>,
        <FigureGroup
          key="content"
          size={node.data.get('size')}
          columns={node.data.get('columns')}
          {...attributes}
        >
          {children}
        </FigureGroup>
      ]
    },
    always(undefined)
  )
}
