import React, { Component } from 'react'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Editor from './components/Editor'

import reducers from './reducers'
import { BlockElement } from './plugins'
import Frame from './components/Frame'
import { PropertyFormContainer } from './components/ui'
import { PropertyForm } from './components/ui'

const Paragraph = BlockElement({
  type: 'paragraph',
  component: ({ node, children, attributes }) => [
    <PropertyForm key={`ui-${node.key}`}>
      <p>Slot {node.key}</p>
    </PropertyForm>,
    <p key={`content-${node.key}`} {...attributes}>
      {children}
    </p>
  ]
})

const Blockquote = BlockElement({
  type: 'blockquote',
  component: ({ children, attributes }) => (
    <blockquote {...attributes}>{children}</blockquote>
  )
})

const Title = BlockElement({
  type: 'title',
  component: ({ children, attributes }) => (
    <h1 {...attributes}>{children}</h1>
  )
})

const InfoboxTitle = BlockElement({
  type: 'infoboxTitle',
  component: ({ children, attributes }) => (
    <h4 {...attributes}>{children}</h4>
  ),
  schema: {
    nodes: [{ objects: ['text'] }],
    parent: {
      types: ['infobox']
    }
  }
})

const InfoboxBody = BlockElement({
  type: 'infoboxBody',
  component: ({ children, attributes }) => (
    <div className="infobox-body" {...attributes}>
      {children}
    </div>
  ),
  schema: {
    nodes: [{ types: ['paragraph'], min: 1 }],
    parent: {
      types: ['infobox']
    }
  }
})

const Infobox = BlockElement({
  type: 'infobox',
  component: ({ children, attributes }) => (
    <div
      style={{ backgroundColor: '#ccc', padding: '15px' }}
      className="infobox"
      {...attributes}
    >
      {children}
    </div>
  ),
  schema: {
    nodes: [
      { types: ['infoboxTitle'], min: 1, max: 1 },
      { types: ['infoboxBody'], min: 1, max: 1 }
    ]
  }
})

const plugins = [
  Blockquote,
  Paragraph,
  Title,
  InfoboxTitle,
  InfoboxBody,
  Infobox
]

class Publikator extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(
      combineReducers(reducers),
      props.state
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <div key="ui" className="ui">
            <PropertyFormContainer
              style={{ position: 'absolute', bottom: '0' }}
            />
          </div>
          <Frame
            style={{ width: '100vw', height: '100vw' }}
          >
            <Editor plugins={plugins} />
          </Frame>
        </div>
      </Provider>
    )
  }
}

export default Publikator
