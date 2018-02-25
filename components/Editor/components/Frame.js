import React, { Component } from 'react'
import Portal from './Portal'
import { styleSheet } from 'glamor'

class Frame extends Component {
  constructor(props) {
    super(props)
    this.container = null
    this.state = {
      css: null
    }
    this.transferCSS = () => {
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
  }

  render() {
    const { children, ...props } = this.props
    const { css } = this.state
    return [
      <iframe
        key="frame"
        title="Document"
        frameBorder={0}
        {...props}
        ref={node => {
          if (!this.container) {
            const style = document.createElement('style')
            const frameBody = node.contentDocument.body
            const container = document.createElement('div')
            frameBody.appendChild(style)
            frameBody.appendChild(container)
            this.container = container
            this.style = style
          }
          this.style.textContent = css
        }}
      />,
      <Portal
        key="portal"
        container={() => this.container}
        onRendered={this.transferCSS}
      >
        {children}
      </Portal>
    ]
  }
}

export default Frame
