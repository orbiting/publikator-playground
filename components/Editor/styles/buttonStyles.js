import { css } from 'glamor'
import { colors } from '@project-r/styleguide'

export const iconButton = css({
  color: colors.textColor,
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  padding: 0,
  backgroundColor: 'transparent',
  transition: 'color .2s',
  '&[disabled]': {
    cursor: 'default',
    color: colors.disabled
  },
  '&[data-active="true"]': {
    color: colors.primary
  }
})

export default {
  iconButton
}
