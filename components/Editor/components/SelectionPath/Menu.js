import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { css } from 'glamor'
import {
  fontStyles,
  colors
} from '@project-r/styleguide'
import { selectNode } from '../../actions/redux'
import withUIState from '../../hoc/withUIState'

const styles = {
  container: css({
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    ...fontStyles.sansSerifRegular15,
    lineHeight: '40px',
    borderBottom: `1px solid ${colors.divider}`
  }),
  nodeLink: css({
    cursor: 'pointer',
    padding: '0px 5px 0px 5px',
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
      {selectionPath.map(n => (
        <a
          {...styles.nodeLink}
          key={n.key}
          onMouseDown={mouseDownHandler(
            n,
            onSelect
          )}
          data-active={n === selectedNode}
        >
          {n.type || n.object}
        </a>
      ))}
    </div>
  )
}

SelectionPathMenu.propTypes = {
  selectedNode: PropTypes.object,
  selectionPath: PropTypes.object,
  onSelect: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onSelect: node => dispatch(selectNode(node))
})

export default compose(
  connect(null, mapDispatchToProps),
  withUIState
)(SelectionPathMenu)
