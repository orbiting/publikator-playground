import {
  Label,
  colors
} from '@project-r/styleguide'
import { css } from 'glamor'
import PropTypes from 'prop-types'

const styles = {
  container: css({
    width: 'max-content',
    backgroundColor: colors.secondaryBg,
    padding: '12px 20px 12px 20px'
  }),
  options: css({
    marginTop: '12px',
    '& > button:not(:first-child)': {
      paddingLeft: '12px'
    }
  }),
  primary: css({
    borderTop: `1px solid ${colors.textColor}`,
    margin: '5px 0'
  })
}

const OptionGroup = ({
  label,
  primary,
  children,
  ...props
}) => {
  return (
    <div {...styles.container} {...props}>
      <Label>{label}</Label>
      {primary && <hr {...styles.primary} />}
      <div {...styles.options}>{children}</div>
    </div>
  )
}

OptionGroup.propTypes = {
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool
}

OptionGroup.defaultProps = {
  primary: false
}

export default OptionGroup
