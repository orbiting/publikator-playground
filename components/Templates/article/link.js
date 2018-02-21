import { A } from '@project-r/styleguide'
import LinkIcon from 'react-icons/lib/fa/chain'

import buttonStyles from '../../Editor/styles/buttonStyles'
import withNodeData from '../../Editor/hoc/withNodeData'
import { isInline } from '../../Editor/utils'
import { renderInline } from '../../Editor/utils/renderers'
import { isOfType } from '../../Editor/utils/mdast'
import PropertyForm from '../../Editor/components/PropertyForm'
import InlineButton from '../../Editor/components/InlineButton'
import TextInput from '../../Editor/components/TextInput'

export const LINK = 'link'

export const LinkButton = props => (
  <InlineButton
    inline={{
      object: 'inline',
      type: LINK,
      data: {
        url: '',
        title: ''
      }
    }}
    {...props}
    {...buttonStyles.iconButton}
  >
    <LinkIcon />
  </InlineButton>
)

const LinkUrlInput = withNodeData('url')(props => (
  <TextInput type="text" label="URL" {...props} />
))

export const LinkPlugin = {
  renderNode: renderInline(
    LINK,
    ({ node, children, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <LinkUrlInput node={node} editor={editor} />
      </PropertyForm>,
      <A
        key="content"
        href={node.data.get('url')}
        title={node.data.get('title')}
        {...attributes}
      >
        {children}
      </A>
    ]
  )
}

export const LinkRule = {
  matchMdast: isOfType('link'),
  match: isInline(LINK),
  fromMdast(node, index, parent, { visitChildren }) {
    return {
      object: 'inline',
      type: LINK,
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
