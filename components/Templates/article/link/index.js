import { A } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline
} from '../../../Editor/utils/foo'

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
      <A
        key="content"
        href={node.data.get('url')}
        title={node.data.get('title')}
        {...attributes}
      >
        {children}
      </A>
    ],
    always(undefined)
  )
}
