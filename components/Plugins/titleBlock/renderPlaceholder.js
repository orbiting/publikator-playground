import {
  compose,
  ifElse,
  always,
  both,
} from 'ramda'

import {
  safeProp,
  isBlock,
  hasEmptyText,
} from '@orbiting/publikator-editor/lib'

import Placeholder from '@orbiting/publikator-editor/components/Placeholder'

export default compose(
  ifElse(
    compose(
      both(isBlock('title'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Titel</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('subject'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Spitzmarke</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('lead'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Lead</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('credits'), hasEmptyText),
      safeProp('node')
    ),
    () => (
      <Placeholder>Autoren, Datum</Placeholder>
    )
  )
)(always(undefined))
