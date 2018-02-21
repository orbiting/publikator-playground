import React, { Component } from 'react'
import Portal from './Portal'
import { styleSheet } from 'glamor'

class Frame extends Component {
  constructor(props) {
    super(props)
    this.container = null
  }

  transferCSS() {
    const css = styleSheet
      .rules()
      .map(r => r.cssText)
      .join('')
    if (css !== this.state.css) {
      this.setState({
        css
      })
    }
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
          const css = styleSheet
            .rules()
            .map(r => r.cssText)
            .join('')
          const style = document.createElement('style')
          const frameBody = node.contentDocument.body
          const container = document.createElement('div')
          style.textContent = css
          frameBody.appendChild(style)
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
