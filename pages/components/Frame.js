import React, { Component } from 'react'
import Portal from './Portal'

class Frame extends Component {
  container = null

  componentWillUnmount() {
    // this.container = null
  }

  render() {
    const { children, ...props } = this.props
    return [
      <iframe
        key="frame"
        title="Document"
        frameBorder={0}
        {...props}
        ref={node => {
          if (this.container) {
            return
          }
          const styles = document.getElementById('css')
          const frameBody = node.contentDocument.body
          const container = document.createElement('div')
          if (styles) {
            frameBody.appendChild(styles.cloneNode(true))
          }
          frameBody.appendChild(container)
          this.container = container
        }}
      />,
      <Portal
        key="portal"
        container={() => this.container}
        onRendered={() => true}
      >
        {children}
      </Portal>
    ]
  }
}

export default Frame
