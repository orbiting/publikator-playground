import React, { Component } from 'react'
import Portal from '../Portal'

const getContainer = id => {
  let el = document.getElementById(id)
  if (el) {
    return el
  }
  el = document.createElement('div')
  el.id = id
  document.body.appendChild(el)
  return el
}

export default class Slot extends Component {
  componentDidMount() {
    if (!this.container) {
      this.container = getContainer(this.props.id)
      if (this.props.children) {
        this.forceUpdate()
      }
    }
  }

  render() {
    return (
      <Portal container={this.container}>
        {this.props.children}
      </Portal>
    )
  }
}
