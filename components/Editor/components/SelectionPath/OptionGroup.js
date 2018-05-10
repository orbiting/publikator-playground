import {
  Label,
  fontStyles
} from '@project-r/styleguide'
import { css } from 'glamor'
import PropTypes from 'prop-types'

const styles = {
  container: css({
    display: 'inline-block',
    width: 'max-content'
  }),
  options: css({
    ...fontStyles.sansSerifRegular15
  })
}

const OptionGroup = ({ label, children }) => (
  <div {...styles.container}>
    <Label>{label}</Label>
    <div {...styles.options}>{children}</div>
  </div>
)

OptionGroup.propTypes = {
  label: PropTypes.string.isRequired
}

export default OptionGroup
