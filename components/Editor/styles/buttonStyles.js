import { css } from 'glamor'

export const iconButton = css({
  minWidth: '40px',
  minHeight: '40px',
  backgroundColor: '#fff',
  border: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  flexDirection: 'row',
  cursor: 'pointer',
  '&[disabled]': {
    cursor: 'default',
    color: '#ccc'
  },
  '&[data-active="true"]': {
    color: '#f00'
  }
})

export default {
  iconButton
}
