import { ifElse, compose, map, head } from 'ramda'
import S from '@orbiting/transform/slate'
import M from '@orbiting/transform/mdast'
import {
  normalize,
  getMany,
} from '@orbiting/transform/normalize'
import {
  mergeResults,
  safeProp,
  safePath,
  notIsNil,
} from '@orbiting/transform/common'

import Paragraph from './paragraph'

const listItemFromMdast = ifElse(
  M.isListItem,
  mergeResults(
    S.toBlock('listItem'),
    S.withNormalizedNodes(
      compose(
        map(
          compose(
            head,
            safeProp('nodes')
          )
        ),
        normalize(getMany(Paragraph.fromMdast))
      )
    )
  )
)

const fromMdast = ifElse(
  M.isList,
  mergeResults(
    S.toBlock('list'),
    S.withNormalizedNodes(
      normalize(getMany(listItemFromMdast))
    ),
    node => ({
      data: {
        ordered: safeProp('ordered', node),
        compact: !safeProp('loose', node),
      },
    })
  )
)
const listItemToMdast = loose =>
  ifElse(
    S.isBlock('listItem'),
    mergeResults(
      M.toType('listItem'),
      M.withChildren,
      () => ({
        loose,
      })
    )
  )

const listToMdast = loose =>
  ifElse(
    S.isBlock('list'),
    mergeResults(
      M.toType('list'),
      M.withNormalizedChildren((node, next) => {
        const isLoose = notIsNil(loose)
          ? loose
          : !safePath(['data', 'compact'])
        const decoratedNext = compose(
          listItemToMdast(isLoose),
          listToMdast(isLoose)
        )(next)
        return decoratedNext(
          safeProp('nodes', node),
          next
        )
      })
    )
  )

export default {
  fromMdast,
  toMdast: listToMdast(),
}
