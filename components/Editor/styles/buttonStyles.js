import { css } from 'glamor'
import { colors } from '@project-r/styleguide'

export const iconButton = css({
  padding: '0 15px',
  minHeight: '40px',
  color: colors.textColor,
  backgroundColor: '#fff',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  transition: 'color .2s, background-color 0.1s',
  '&[disabled]': {
    cursor: 'default',
    color: colors.disabled
  },
  '&[data-active="true"]': {
    backgroundColor: colors.primary,
    color: '#fff'
  }
})

export default {
  iconButton
}
