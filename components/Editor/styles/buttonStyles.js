import { css } from 'glamor'
import { colors } from '@project-r/styleguide'

export const iconButton = css({
  minWidth: '40px',
  minHeight: '40px',
  backgroundColor: '#fff',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  transition: 'color .3s',
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
