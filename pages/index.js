import React, { Component } from 'react'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import Editor from './components/Editor'

import reducers from './reducers'
import { BlockElement } from './plugins'
import Frame from './components/Frame'

import PropertyForm from './components/PropertyForm'
import PropertyFormContainer from './components/PropertyFormContainer'
import SelectionPath from './components/SelectionPath'
import { css } from 'glamor'

css.global('html, body', { padding: 0, margin: 0 })
const styles = {
  root: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'sans-serif, Arial, Helvetica'
  }),
  doc: css({
    flex: '1 100%'
  })
}

const Paragraph = BlockElement({
  type: 'paragraph',
  component: ({ node, children, attributes }) => [
    <PropertyForm key={`ui-${node.key}`} node={node}>
      Slot {node.key}
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
        <div {...styles.root}>
          <SelectionPath />
          <PropertyFormContainer />
          <Frame {...styles.doc}>
            <Editor plugins={plugins} />
          </Frame>
        </div>
      </Provider>
    )
  }
}

export default Publikator
