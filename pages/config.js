import React from 'react'
import { Block, Text } from 'slate'

import { exec } from './utils'
import {
  renderBlock,
  renderMark,
  renderInline,
  renderPlaceholder,
  renderInlinePlaceholder
} from './utils/renderers'
import { blockSchema } from './utils/schema'
import {
  staticText,
  softBreak,
  removeEmpty,
  removeImage
} from './utils/keyHandlers'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBold from '@fortawesome/fontawesome-free-solid/faBold'
import faItalic from '@fortawesome/fontawesome-free-solid/faItalic'
import faLink from '@fortawesome/fontawesome-free-solid/faLink'
import faParagraph from '@fortawesome/fontawesome-free-solid/faParagraph'
import faQuoteRight from '@fortawesome/fontawesome-free-solid/faQuoteRight'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'
import faImage from '@fortawesome/fontawesome-free-solid/faImage'
import faFileImage from '@fortawesome/fontawesome-free-solid/faFileImage'

import withNodeData from './hoc/withNodeData'

import PropertyForm from './components/PropertyForm'
import MarkButton from './components/MarkButton'
import InlineButton from './components/InlineButton'
import FormatBlockButton from './components/FormatBlockButton'
import InsertBlockButton from './components/InsertBlockButton'
import TextInput from './components/TextInput'
import ImageInput from './components/ImageInput'

import buttonStyles from './styles/buttonStyles'

const newInfoBox = () =>
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

const newFigure = () =>
  Block.create({
    type: 'figure',
    nodes: [
      Block.create({
        type: 'image',
        isVoid: true,
        data: {
          url: '',
          title: ''
        }
      }),
      Block.create({
        type: 'caption',
        nodes: [
          Block.create({
            type: 'captionText',
            nodes: [Text.create('')]
          }),
          Block.create({
            type: 'byline',
            nodes: [Text.create('')]
          })
        ]
      })
    ]
  })

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
  <MarkButton
    mark="bold"
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faBold} />
  </MarkButton>
)

const ItalicButton = props => (
  <MarkButton
    mark="italic"
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faItalic} />
  </MarkButton>
)

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
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faLink} />
  </InlineButton>
)

const ParagraphButton = props => (
  <FormatBlockButton
    block="paragraph"
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faParagraph} />
  </FormatBlockButton>
)

const BlockquoteButton = props => (
  <FormatBlockButton
    block="blockquote"
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faQuoteRight} />
  </FormatBlockButton>
)

const InsertInfoboxButton = props => (
  <InsertBlockButton
    block={newInfoBox}
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faInfoCircle} />
  </InsertBlockButton>
)

const InsertFigureButton = props => (
  <InsertBlockButton
    block={newFigure}
    {...props}
    {...buttonStyles.iconButton}
  >
    <FontAwesomeIcon size="2x" icon={faImage} />
  </InsertBlockButton>
)

const LinkUrlInput = withNodeData('url')(props => (
  <TextInput type="text" label="URL" {...props} />
))

const Link = {
  renderNode: exec(
    renderInline(
      'link',
      ({ node, children, attributes, editor }) => [
        <PropertyForm key="ui" node={node}>
          <LinkUrlInput node={node} editor={editor} />
        </PropertyForm>,
        <a
          key="content"
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

const Paragraph = {
  renderNode: renderBlock(
    'paragraph',
    ({ node, children, attributes, editor }) => [
      <PropertyForm offset={1} key="ui" node={node}>
        <label>Insert</label>
        <InsertInfoboxButton node={node} editor={editor} />
        <InsertFigureButton node={node} editor={editor} />
        <label>Block format</label>
        <ParagraphButton node={node} editor={editor} />
        <BlockquoteButton node={node} editor={editor} />
        <label>Text format</label>
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <LinkButton editor={editor} />
      </PropertyForm>,
      <p key="content" {...attributes}>
        {children}
      </p>
    ]
  )
}

const Blockquote = {
  renderNode: renderBlock(
    'blockquote',
    ({ node, children, attributes, editor }) => [
      <PropertyForm offset={1} key="ui" node={node}>
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <LinkButton editor={editor} />
        <ParagraphButton node={node} editor={editor} />
        <BlockquoteButton node={node} editor={editor} />
      </PropertyForm>,
      <blockquote key="content" {...attributes}>
        {children}
      </blockquote>
    ]
  )
}

const Figure = {
  renderNode: renderBlock(
    'figure',
    ({ node, attributes, children }) => [
      <PropertyForm key="ui" node={node} offset={2}>
        {' '}
      </PropertyForm>,
      <figure {...attributes} key="content">
        {children}
      </figure>
    ]
  ),
  schema: blockSchema('figure', {
    nodes: [
      { types: ['figureImage'], min: 1, max: 1 },
      { types: ['caption'], min: 1, max: 1 }
    ]
  }),
  onKeyDown: removeEmpty({
    type: 'figure',
    isEmpty: n =>
      !n.text.trim() && !n.nodes.first().data.get('url')
  })
}

const SelectImageButton = withNodeData('url')(ImageInput)

const Image = {
  renderNode: renderBlock(
    'image',
    ({ node, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <SelectImageButton
          node={node}
          editor={editor}
          {...buttonStyles.iconButton}
        >
          <FontAwesomeIcon size="2x" icon={faFileImage} />
        </SelectImageButton>
      </PropertyForm>,
      !!node.data.get('url') ? (
        <img
          key="content"
          src={node.data.get('url')}
          title={node.data.get('title')}
          style={{ maxWidth: '600px' }}
          {...attributes}
        />
      ) : (
        <SelectImageButton
          key="content"
          node={node}
          editor={editor}
        >
          <img
            src="static/images/placeholder.png"
            style={{ maxWidth: '600px' }}
            {...attributes}
          />
        </SelectImageButton>
      )
    ]
  ),
  schema: blockSchema('image', {
    isVoid: true
  }),
  onKeyDown: removeImage({ type: 'image' })
}

const Caption = {
  renderNode: exec(
    renderBlock(
      'caption',
      ({ node, children, attributes }) => [
        <PropertyForm key="ui" node={node}>
          Caption
        </PropertyForm>,
        <figcaption key="content" {...attributes}>
          {children}
        </figcaption>
      ]
    ),
    renderBlock(
      'captionText',
      ({ node, children, attributes, editor }) => [
        <PropertyForm key="ui" node={node} offset={1}>
          <BoldButton editor={editor} />
          <LinkButton editor={editor} />
        </PropertyForm>,
        <span key="content" {...attributes}>
          {children}
        </span>
      ]
    ),
    renderBlock(
      'byline',
      ({ node, children, attributes, editor }) => [
        <PropertyForm key="ui" node={node} offset={1}>
          <LinkButton editor={editor} />
        </PropertyForm>,
        <cite key="content" {...attributes}>
          {children}
        </cite>
      ]
    )
  ),
  onKeyDown: exec(
    staticText({
      type: 'byline',
      afterType: 'paragraph'
    }),
    staticText({
      type: 'captionText'
    })
  ),
  renderPlaceholder: exec(
    renderInlinePlaceholder('captionText', 'Legende'),
    renderInlinePlaceholder('byline', ' Credits')
  ),
  schema: blockSchema('caption', {
    nodes: [
      { types: ['captionText'], min: 1, max: 1 },
      { types: ['byline'], min: 1, max: 1 }
    ]
  })
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
    ({ node, children, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <BoldButton editor={editor} />
      </PropertyForm>,
      <p
        key="content"
        style={{ position: 'relative' }}
        {...attributes}
      >
        {children}
      </p>
    ]
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
      <PropertyForm key="ui" node={node} offset={2}>
        <InsertInfoboxButton
          insertAfter={true}
          node={node}
          editor={editor}
        />
        <InsertFigureButton
          insertAfter={true}
          node={node}
          editor={editor}
        />
      </PropertyForm>,
      <div
        key="content"
        style={{
          backgroundColor: '#ddd',
          padding: '15px',
          margin: '15px'
        }}
        {...attributes}
      >
        {children}
      </div>
    ]
  ),
  schema: blockSchema('infobox', {
    nodes: [
      { types: ['infoboxTitle'], min: 1, max: 1 },
      { types: ['infoboxText'], min: 1, max: 1 }
    ]
  }),
  onKeyDown: removeEmpty({
    type: 'infobox',
    isEmpty: node => !node.text.trim()
  })
}

export const plugins = [
  Marks,
  Link,
  Blockquote,
  Figure,
  Caption,
  Image,
  Paragraph,
  Title,
  Infobox,
  InfoboxText,
  InfoboxTitle
]
