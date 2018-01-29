import React from 'react'
import { css } from 'glamor'
import withUI from './hoc/withUI'

const styles = {
  container: css({
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: '60px'
  }),
  nodeLink: css({
    padding: '0px 5px 0px 5px'
  })
}

const SelectionPath = ({ selectedNode, selectionPath }) => {
  if (!selectionPath) {
    return <div {...styles.container}>No node selected</div>
  }
  return (
    <div {...styles.container}>
      {selectionPath.map(n => (
        <a
          {...styles.nodeLink}
          key={n.key}
          style={{
            color: n === selectedNode ? '#f00' : '#000'
          }}
        >
          {n.type || n.object}
        </a>
      ))}
    </div>
  )
}

export default withUI(SelectionPath)
