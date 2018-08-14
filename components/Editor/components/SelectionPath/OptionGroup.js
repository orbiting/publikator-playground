import { Label } from '@project-r/styleguide'
import { withTheme } from '../../apps/theme'

const OptionGroup = ({
  label,
  primary,
  children,
  styles,
  ...props
}) => {
  const layoutStyles = styles.layout

  return (
    <div {...layoutStyles.container} {...props}>
      <Label>{label}</Label>
      {primary && (
        <hr {...layoutStyles.hairline} />
      )}
      <div {...layoutStyles.actions}>
        {children}
      </div>
    </div>
  )
}

export default withTheme()(OptionGroup)
