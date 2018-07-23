import {
  compose,
  ifElse,
  always,
  both
} from 'ramda'

import Placeholder from '@orbiting/publikator-editor/components/Placeholder'

import {
  safeProp,
  isBlock,
  hasEmptyText
} from '@orbiting/publikator-editor/lib'

export default compose(
  ifElse(
    compose(
      both(isBlock('infoBoxTitle'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Titel</Placeholder>
  ),
  ifElse(
    compose(
      both(isBlock('infoBoxText'), hasEmptyText),
      safeProp('node')
    ),
    () => <Placeholder>Text...</Placeholder>
  )
)(always(undefined))
