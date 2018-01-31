import React, { Component } from 'react'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { exec } from './utils'

import Editor from './components/Editor'

import reducers from './reducers'
import {
  blockSchema,
  renderBlock,
  renderPlaceholder
} from './plugins'
import {
  staticText,
  softBreak,
  removeEmpty
} from './plugins/keyHandlers'
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

const Paragraph = {
  type: 'paragraph',
  renderNode: renderBlock(
    'paragraph',
    ({ node, children, attributes }) => [
      <PropertyForm key={`ui-${node.key}`} node={node}>
        Paragraph {node.key}
      </PropertyForm>,
      <p key={`content-${node.key}`} {...attributes}>
        {children}
      </p>
    ]
  )
}

const Blockquote = {
  renderNode: renderBlock(
    'blockquote',
    ({ children, attributes }) => (
      <blockquote {...attributes}>{children}</blockquote>
    )
  )
}

const Image = {
  renderNode: renderBlock(
    'image',
    ({ node, attributes }) => [
      <PropertyForm key={`ui-${node.key}`} node={node}>
        <label htmlFor={`fileinput-${node.key}`}>
          Select image
          <input
            style={{ display: 'none' }}
            id={`fileinput-${node.key}`}
            type="file"
          />
        </label>
      </PropertyForm>,
      <img
        key={`content-${node.key}`}
        src={node.data.get('src')}
        title={node.data.get('title')}
        style={{ maxWidth: '600px' }}
        {...attributes}
      />
    ]
  ),
  schema: blockSchema('image', { isVoid: true })
}

const Title = {
  renderNode: renderBlock(
    'title',
    ({ children, attributes }) => (
      <h1 {...attributes}>{children}</h1>
    )
  ),
  onKeyDown: staticText({
    type: 'title',
    afterType: 'paragraph'
  }),
  renderPlaceholder: renderPlaceholder('title', 'Title')
}

const InfoboxTitle = {
  renderNode: renderBlock(
    'infoboxTitle',
    ({ children, attributes }) => (
      <h4 {...attributes}>{children}</h4>
    )
  ),
  schema: blockSchema('infoboxTitle', {
    nodes: [{ objects: ['text'] }],
    parent: {
      types: ['infobox']
    }
  }),
  onKeyDown: staticText({
    type: 'infoboxTitle',
    afterType: 'infoboxText',
    insertAfterType: 'infobox'
  }),
  renderPlaceholder: renderPlaceholder(
    'infoboxTitle',
    'Infobox'
  )
}

const InfoboxText = {
  renderNode: renderBlock(
    'infoboxText',
    ({ children, attributes }) => (
      <p {...attributes}>{children}</p>
    )
  ),
  schema: blockSchema('infoboxText', {
    nodes: [{ objects: ['text'] }],
    parent: {
      types: ['infobox']
    }
  }),
  onKeyDown: exec(
    softBreak({
      type: 'infoboxText'
    }),
    staticText({
      type: 'infoboxText',
      afterType: 'paragraph'
    })
  ),
  renderPlaceholder: renderPlaceholder(
    'infoboxText',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in aliquet lacus, nec semper libero.'
  )
}

const Infobox = {
  renderNode: renderBlock(
    'infobox',
    ({ children, attributes }) => (
      <div
        style={{ backgroundColor: '#ccc', padding: '15px' }}
        className="infobox"
        {...attributes}
      >
        {children}
      </div>
    )
  ),
  schema: blockSchema('infobox', {
    nodes: [
      { types: ['infoboxTitle'], min: 1, max: 1 },
      { types: ['infoboxText'], min: 1 }
    ]
  }),
  onKeyDown: removeEmpty({
    type: 'infobox',
    isEmpty: node => !node.text
  })
}

const plugins = [
  Blockquote,
  Image,
  Paragraph,
  Title,
  Infobox,
  InfoboxText,
  InfoboxTitle
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
