import { Editorial } from '@project-r/styleguide'

import { ifElse, compose, always } from 'ramda'

import {
  safeProp,
  isInline
} from '../../../Editor/lib'

import SelectionPath from '../../../Editor/components/SelectionPath'
import {
  LinkUrlInput,
  LinkTitleInput,
  LinkCard
} from './ui'

export default {
  renderNode: ifElse(
    compose(isInline('link'), safeProp('node')),
    ({ node, children, attributes, editor }) => [
      <SelectionPath.Options key="ui" node={node}>
        <SelectionPath.OptionGroup
          label="Link"
          primary
        >
          <LinkCard node={node} />
        </SelectionPath.OptionGroup>
      </SelectionPath.Options>,
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
