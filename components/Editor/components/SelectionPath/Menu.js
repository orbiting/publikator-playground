import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import ArrowIcon from 'react-icons/lib/fa/angle-right'
import {
  fontStyles,
  colors
} from '@project-r/styleguide'

import { withApp } from '../../apps/selectionPath'

const styles = {
  container: css({
    backgroundColor: colors.secondaryBg,
    padding: '0 20px',
    width: 'max-content',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // ...fontStyles.sansSerifRegular15,
    lineHeight: '55px'
    // borderBottom: `1px solid ${colors.divider}`
  }),
  nodeLink: css({
    ...fontStyles.sansSerifRegular16,
    cursor: 'pointer',
    '&[data-active="true"]': {
      color: colors.primary,
      cursor: 'default',
      textDecoration: 'underline'
    }
  })
}

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
  onSelect
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
  onSelect: PropTypes.func.isRequired
}

export default withApp(SelectionPathMenu)
