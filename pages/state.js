import React from 'react'

import initial from './usa'

import Article from '../lib/rules'
import {
  deserialize,
  serialize
} from '../lib/serializer'
import { prettyPrint } from '../lib/transform/common'
import { parse } from '@orbiting/remark-preset'

const deserializeArticle = deserialize(
  Article.fromMdast
)

const serializeArticle = serialize(
  Article.toMdast
)

export default () => (
  <div>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {prettyPrint(parse(initial))}
    </pre>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {prettyPrint(
        deserializeArticle(parse(initial))
      )}
    </pre>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {prettyPrint(
        serializeArticle(
          deserializeArticle(parse(initial))
        )
      )}
    </pre>
  </div>
)
