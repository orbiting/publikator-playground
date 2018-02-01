import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { selectNode } from '../actions/redux'
import withUI from '../hoc/withUI'

const styles = {
  container: css({
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: '60px'
  }),
  nodeLink: css({
    cursor: 'pointer',
    padding: '0px 5px 0px 5px',
    '&[data-active="true"]': {
      color: '#f00',
      cursor: 'default'
    }
  })
}

const mouseDownHandler = (node, onSelect) => event => {
  event.preventDefault()
  onSelect(node)
}

const SelectionPath = ({
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
          onMouseDown={mouseDownHandler(n, onSelect)}
          data-active={n === selectedNode}
        >
          {n.type || n.object}
        </a>
      ))}
    </div>
  )
}

SelectionPath.propTypes = {
  selectedNode: PropTypes.object,
  selectionPath: PropTypes.object,
  onSelect: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onSelect: node => dispatch(selectNode(node))
})

export default compose(
  connect(null, mapDispatchToProps),
  withUI
)(SelectionPath)
