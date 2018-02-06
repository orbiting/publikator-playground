import {
  isDocument,
  isBlock,
  isInline,
  isMark,
  not
} from '../../Editor/utils'

import {
  isOfType,
  isImageParagraph,
  isZone,
  isHeading
} from '../../Editor/utils/mdast'

const documentRule = {
  matchMdast: isOfType('root'),
  match: isDocument,
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      document: {
        nodes: visitChildren(node),
        data: node.meta
      }
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'root',
      children: visitChildren(node.nodes),
      meta: node.data
    }
  }
}

const boldRule = {
  matchMdast: isOfType('strong'),
  match: isMark('bold'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'mark',
      type: 'bold',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'strong',
      children: visitChildren(node)
    }
  }
}

const italicRule = {
  matchMdast: isOfType('emphasis'),
  match: isMark('italic'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'mark',
      type: 'italic',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'emphasis',
      children: visitChildren(node)
    }
  }
}

const linkRule = {
  matchMdast: isOfType('link'),
  match: isInline('link'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'inline',
      type: 'link',
      data: {
        title: node.title,
        url: node.url
      },
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    const { title, url } = node.data
    return {
      type: 'link',
      title,
      url,
      children: visitChildren(node)
    }
  }
}

const titleRule = {
  matchMdast: isHeading(1),
  match: isBlock('title'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'title',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'heading',
      depth: 1,
      children: visitChildren(node)
    }
  }
}

const paragraphRule = {
  matchMdast: isOfType('paragraph'),
  match: isBlock('paragraph'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'paragraph',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'paragraph',
      children: visitChildren(node)
    }
  }
}

const blockquoteRule = {
  matchMdast: isOfType('blockquote'),
  match: isBlock('blockquote'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'blockquote',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'blockquote',
      children: visitChildren(node)
    }
  }
}

const imageRule = {
  matchMdast: isImageParagraph,
  match: isBlock('image'),
  fromMdast(node) {
    return {
      object: 'block',
      type: 'image',
      isVoid: true,
      src: node.children[0].url,
      title: node.children[0].title
    }
  },
  toMdast(node) {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'image',
          url: node.data.get('src'),
          title: node.data.get('title')
        }
      ]
    }
  }
}

const captionRule = {
  matchMdast: isOfType('paragraph'),
  match: isBlock('caption'),
  fromMdast(node, index, parent, { visitChildren }) {
    const captionText = {
      type: 'paragraph',
      children: node.children.filter(
        not(isOfType('emphasis'))
      )
    }

    const captionCite = node.children.find(
      isOfType('emphasis')
    ) || { type: 'emphasis', children: [] }

    return {
      object: 'block',
      type: 'caption',
      nodes: [
        {
          kind: 'block',
          type: 'captionText',
          nodes: visitChildren(captionText)
        },
        {
          kind: 'block',
          type: 'captionCite',
          nodes: visitChildren(captionCite)
        }
      ]
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    const [captionBlock, citeBlock] = node.nodes
    return {
      type: 'paragraph',
      children: [
        ...visitChildren(captionBlock),
        {
          type: 'emphasis',
          children: visitChildren(citeBlock)
        }
      ]
    }
  }
}

const figureRule = {
  matchMdast: isZone('FIGURE'),
  match: isBlock('figure'),
  fromMdast(node, index, parent, rest) {
    const [image, caption] = node.children
    return {
      object: 'block',
      type: 'figure',
      nodes: [
        imageRule.fromMdast(image, 0, node, rest),
        captionRule.fromMdast(caption, 1, node, rest)
      ]
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: 'FIGURE',
      data: node.data,
      children: visitChildren(node)
    }
  }
}

const infoboxTitleRule = {
  matchMdast: isHeading(2),
  match: isBlock('infoboxTitle'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'infoboxTitle',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'heading',
      depth: 2,
      children: visitChildren(node)
    }
  }
}

const infoboxTextRule = {
  matchMdast: isOfType('paragraph'),
  match: isBlock('infoboxText'),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'block',
      type: 'infoboxText',
      nodes: visitChildren(node)
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'paragraph',
      children: visitChildren(node)
    }
  }
}

const infoboxRule = {
  matchMdast: isZone('INFOBOX'),
  match: isBlock('infobox'),
  fromMdast(node, index, parent, rest) {
    const [infoboxTitle, infoboxText] = node.children
    return {
      object: 'block',
      type: 'figure',
      nodes: [
        infoboxTitleRule.fromMdast(
          infoboxTitle,
          0,
          node,
          rest
        ),
        infoboxTextRule.fromMdast(
          infoboxText,
          1,
          node,
          rest
        )
      ]
    }
  },
  toMdast(node, index, parent, { visitChildren }) {
    return {
      type: 'zone',
      identifier: 'INFOBOX',
      data: node.data,
      children: visitChildren(node)
    }
  }
}

export default [
  documentRule,
  infoboxRule,
  figureRule,
  paragraphRule,
  titleRule,
  blockquoteRule,
  boldRule,
  italicRule,
  linkRule
]
