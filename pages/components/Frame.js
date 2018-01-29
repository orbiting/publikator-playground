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

          const frameBody = node.contentDocument.body
          const container = document.createElement('div')
          frameBody.appendChild(container)
          this.container = container
        }}
      />,
      <Portal key="portal" container={() => this.container}>
        {children}
      </Portal>
    ]
  }
}

export default Frame
