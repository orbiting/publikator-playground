import React from 'react'
import { Block, Text } from 'slate'

import { exec } from './utils'
import {
  renderBlock,
  renderMark,
  renderPlaceholder,
  renderInline
} from './utils/renderers'
import { blockSchema } from './utils/schema'
import {
  staticText,
  softBreak,
  removeEmpty
} from './utils/keyHandlers'

import BoldIcon from 'react-icons/lib/fa/bold'
import ItalicIcon from 'react-icons/lib/fa/italic'
import LinkIcon from 'react-icons/lib/fa/chain'
import ParagraphIcon from 'react-icons/lib/fa/paragraph'
import QuoteIcon from 'react-icons/lib/fa/quote-right'
import InfoboxIcon from 'react-icons/lib/fa/info-circle'

import PropertyForm from './components/PropertyForm'
import MarkButton from './components/MarkButton'
import InlineButton from './components/InlineButton'
import FormatBlockButton from './components/FormatBlockButton'
import InsertBlockButton from './components/InsertBlockButton'
import Input from './components/Input'

import withNodeData from './hoc/withNodeData'

const Marks = {
  renderMark: exec(
    renderMark('bold', ({ children, attributes }) => (
      <strong {...attributes}>{children}</strong>
    )),
    renderMark('italic', ({ children, attributes }) => (
      <em {...attributes}>{children}</em>
    ))
  )
}

const BoldButton = props => (
  <MarkButton mark="bold" icon={BoldIcon} {...props} />
)
const ItalicButton = props => (
  <MarkButton mark="italic" icon={ItalicIcon} {...props} />
)

const LinkUrlInput = withNodeData('url')(props => (
  <Input type="text" label="URL" {...props} />
))

const InsertInfoboxButton = props => (
  <InsertBlockButton
    icon={InfoboxIcon}
    block={() =>
      Block.create({
        type: 'infobox',
        nodes: [
          Block.create({
            type: 'infoboxTitle',
            nodes: [Text.create('')]
          }),
          Block.create({
            type: 'infoboxText',
            nodes: [Text.create('')]
          })
        ]
      })
    }
    {...props}
  />
)

const Link = {
  renderNode: exec(
    // (...args) => console.log(args),
    renderInline(
      'link',
      ({ node, children, attributes, editor }) => [
        <PropertyForm key={`ui-${node.key}`} node={node}>
          <LinkUrlInput node={node} editor={editor} />
        </PropertyForm>,
        <a
          key={`content-${node.key}`}
          style={{ color: '#00f' }}
          href={node.data.get('url')}
          title={node.data.get('title')}
          {...attributes}
        >
          {children}
        </a>
      ]
    )
  )
}

const LinkButton = props => (
  <InlineButton
    inline={{
      object: 'inline',
      type: 'link',
      data: {
        url: '',
        title: ''
      }
    }}
    icon={LinkIcon}
    {...props}
  />
)

const ParagraphButton = props => (
  <FormatBlockButton
    block="paragraph"
    icon={ParagraphIcon}
    {...props}
  />
)

const BlockquoteButton = props => (
  <FormatBlockButton
    block="blockquote"
    icon={QuoteIcon}
    {...props}
  />
)

const Paragraph = {
  renderNode: renderBlock(
    'paragraph',
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        offset={1}
        key={`ui-${node.key}`}
        node={node}
      >
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <LinkButton editor={editor} />
        <ParagraphButton node={node} editor={editor} />
        <BlockquoteButton node={node} editor={editor} />
        <InsertInfoboxButton node={node} editor={editor} />
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
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        offset={1}
        key={`ui-${node.key}`}
        node={node}
      >
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <LinkButton editor={editor} />
        <ParagraphButton node={node} editor={editor} />
        <BlockquoteButton node={node} editor={editor} />
      </PropertyForm>,
      <blockquote
        key={`content-${node.key}`}
        {...attributes}
      >
        {children}
      </blockquote>
    ]
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
      <h1 style={{ position: 'relative' }} {...attributes}>
        {children}
      </h1>
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
      <h4 style={{ position: 'relative' }} {...attributes}>
        {children}
      </h4>
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
      <p style={{ position: 'relative' }} {...attributes}>
        {children}
      </p>
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
    ({ node, children, attributes, editor }) => [
      <PropertyForm
        key={`ui-${node.key}`}
        node={node}
        offset={2}
      >
        <InsertInfoboxButton
          insertAfter={true}
          node={node}
          editor={editor}
        />
      </PropertyForm>,
      <div
        key={`content-${node.key}`}
        style={{
          backgroundColor: '#ddd',
          padding: '15px',
          margin: '15px'
        }}
        className="infobox"
        {...attributes}
      >
        {children}
      </div>
    ]
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

export const plugins = [
  Marks,
  Link,
  Blockquote,
  Image,
  Paragraph,
  Title,
  Infobox,
  InfoboxText,
  InfoboxTitle
]