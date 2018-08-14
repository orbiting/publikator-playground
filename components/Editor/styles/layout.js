import { css } from 'glamor'
import { colors } from '@project-r/styleguide'

ui: css({
  position: 'fixed',
  width: 0,
  zIndex: 9999
})

export const root = css({
  width: 0,
  '&:empty': {
    height: 0
  }
})

export const container = css({
  width: 'max-content',
  padding: '12px 20px 12px 20px'
})

export const section = css({
  marginTop: '12px'
})

export const heading = css({
  display: 'flex',
  justifyContent: 'space-between'
})

export const sectionHeading = css(
  section,
  heading
)

export const hairline = css({
  borderTop: `1px solid ${colors.divider}`,
  margin: '5px 0'
})

export const horizontalGroup = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
  alignContent: 'stretch',
  '& > *': {
    margin: '0 6px'
  }
})

export const actions = css(
  horizontalGroup,
  section
)
