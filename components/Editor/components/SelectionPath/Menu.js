import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import ArrowIcon from 'react-icons/lib/fa/angle-right'
import { compose } from 'ramda'
import { withApp } from '../../apps/selectionPath'
import { withTheme } from '../../apps/theme'

const withStyles = withTheme(({ theme }) => {
  return {
    container: css(
      theme.layout.container,
      css({
        maxWidth: `none`,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        lineHeight: '55px',
      })
    ),
    nodeLink: css(
      theme.buttons.labelButton,
      css({
        ...theme.fontStyles.sansSerifRegular16,
        '&[data-active="true"]': {
          color: theme.colors.primary,
          cursor: 'default',
          textDecoration: 'underline',
        },
      })
    ),
  }
})

const mouseDownHandler = (
  node,
  onSelect
) => event => {
  event.preventDefault()
  onSelect(node)
}

const SelectionPathMenu = ({
  selectedNode,
  selectionPath,
  onSelect,
  styles,
}) => {
  if (!selectionPath) {
    return (
      <div {...styles.container}>
        Multiple nodes selected
      </div>
    )
  }
  return (
    <div {...styles.container}>
      {selectionPath.map((n, i) => (
        <span key={n.key}>
          {i > 0 && (
            <ArrowIcon
              style={{ margin: '0 15px' }}
            />
          )}
          <a
            {...styles.nodeLink}
            onMouseDown={mouseDownHandler(
              n,
              onSelect
            )}
            data-active={n === selectedNode}
          >
            {n.type || n.object}
          </a>
        </span>
      ))}
    </div>
  )
}

SelectionPathMenu.propTypes = {
  selectedNode: PropTypes.object,
  selectionPath: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
}

export default compose(
  withApp,
  withStyles
)(SelectionPathMenu)
