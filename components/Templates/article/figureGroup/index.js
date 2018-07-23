import { FigureGroup } from '@project-r/styleguide'
import { ifElse, compose, always } from 'ramda'
import {
  safeProp,
  isBlock
} from '@orbiting/publikator-editor/lib'
import SelectionPath from '@orbiting/publikator-editor/components/SelectionPath'
import RadioButton from '@orbiting/publikator-editor/components/RadioButton'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'

const sizeChangeHandler = onChange => v =>
  onChange({ size: v || null })

const columnsChangeHandler = onChange => e => {
  e.stopPropagation()
  onChange({ columns: Number(e.target.value) })
}
const FigureGroupForm = withNodeData()(
  ({ value, onChange }) => {
    return (
      <div>
        <RadioButton
          name="figureGroupSize"
          value=""
          label="Default"
          checked={value.get('size') === null}
          onChange={sizeChangeHandler(onChange)}
        />
        <RadioButton
          name="figureGroupSize"
          value="breakout"
          label="Breakout"
          checked={
            value.get('size') === 'breakout'
          }
          onChange={sizeChangeHandler(onChange)}
        />
        <label htmlFor="columns-select">
          Spalten
          <select
            value={value.get('columns')}
            onChange={columnsChangeHandler(
              onChange
            )}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
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
