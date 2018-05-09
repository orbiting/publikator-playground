import { Editorial } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline
} from '../../../Editor/lib'

import PropertyForm from '../../../Editor/components/PropertyForm'
import { LinkUrlInput } from './ui'

export default {
  renderNode: ifElse(
    compose(isInline('link'), safeProp('node')),
    ({ node, children, attributes, editor }) => [
      <PropertyForm key="ui" node={node}>
        <LinkUrlInput
          node={node}
          editor={editor}
        />
      </PropertyForm>,
      <Editorial.A
        key="content"
        href={node.data.get('url')}
        title={node.data.get('title')}
        {...attributes}
      >
        {children}
      </Editorial.A>
    ],
    always(undefined)
  )
}
