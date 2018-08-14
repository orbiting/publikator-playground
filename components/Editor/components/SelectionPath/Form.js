import { Label } from '@project-r/styleguide'
import { withTheme } from '../../apps/theme'

const Form = ({
  label,
  children,
  action,
  styles,
  ...props
}) => {
  const layoutStyles = styles.layout
  return (
    <div {...layoutStyles.container} {...props}>
      <div {...layoutStyles.sectionHeading}>
        <Label>{label}</Label>
        {action}
      </div>
      <hr {...layoutStyles.hairline} />
      {children}
    </div>
  )
}

export default withTheme()(Form)
