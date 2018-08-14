import {
  Label,
  colors
} from '@project-r/styleguide'
import { css } from 'glamor'
import PropTypes from 'prop-types'

const styles = {
  container: css({
    width: 'max-content',
    backgroundColor: '#fff',
    border: `1px solid ${colors.divider}`,
    margin: '-5px 0 0 5px',
    padding: '12px 20px 12px 20px'
  }),
  options: css({
    marginTop: '12px',
    '& > button:not(:first-child)': {
      paddingLeft: '12px'
    }
  }),
  label: css({
    display: 'flex',
    justifyContent: 'space-between'
  }),
  hr: css({
    borderTop: `1px solid ${colors.divider}`,
    margin: '5px 0 15px 0'
  })
}

const Form = ({
  label,
  children,
  action,
  ...props
}) => {
  return (
    <div {...styles.container} {...props}>
      <div {...styles.label}>
        <Label>{label}</Label>
        {action}
      </div>
      <hr {...styles.hr} />
      <div {...styles.options}>{children}</div>
    </div>
  )
}

Form.propTypes = {
  label: PropTypes.string.isRequired
}

export default Form
