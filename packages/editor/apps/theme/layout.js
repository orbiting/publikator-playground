import { css } from 'glamor'
import { colors } from '@project-r/styleguide'

export const ui = ({ isVisible, align }) =>
  css({
    display: !isVisible ? 'none' : 'flex',
    position: 'fixed',
    width: '0',
    top: '0',
    right: align === 'right' ? '0' : 'auto',
    zIndex: 9999,
    flexDirection: 'column',
    flexWrap: 'noWrap',
    alignItems:
      align === 'right'
        ? 'flex-end'
        : 'flex-start',
    alignContent:
      align === 'right'
        ? 'flex-end'
        : 'flex-start',
    '&:empty': {
      height: 0,
    },
  })

export const container = ({
  align, // 'right'
  style, // 'block'
  maxWidth,
}) =>
  css({
    maxWidth: `${maxWidth}px`,
    backgroundColor:
      style === 'block'
        ? '#fff'
        : colors.secondaryBg,
    width:
      style === 'block'
        ? `${maxWidth}px`
        : 'max-content',
    borderColor: colors.divider,
    borderTopWidth: '0',
    borderBottomWidth: '0',
    borderRightWidth:
      style === 'block' && align === 'left'
        ? '1px'
        : '0',
    borderLeftWidth:
      style === 'block' && align === 'right'
        ? '1px'
        : '0',
    right: align === 'right' ? 0 : 'auto',
    padding: '12px 20px 12px 20px',
  })

export const section = css({
  marginTop: '12px',
})

export const heading = css({
  display: 'flex',
  justifyContent: 'space-between',
})

export const sectionHeading = css(
  section,
  heading
)

export const hairline = css({
  borderTop: `1px solid ${colors.divider}`,
  margin: '5px 0',
})

export const horizontalGroup = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  alignContent: 'stretch',
  '& > *': {
    margin: '0 6px',
  },
})

export const actions = css(
  horizontalGroup,
  section
)

export default config => ({
  ui: ui(config),
  container: container(config),
  section,
  heading,
  sectionHeading,
  hairline,
  horizontalGroup,
  actions,
})
