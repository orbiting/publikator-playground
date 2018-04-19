import React from 'react'

import initial from './usa'

import Article from '../lib/rules'
import {
  deserialize,
  serialize
} from '../lib/serializer'
import { prettyPrint } from '../lib/transform/common'

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
      {prettyPrint(initial)}
    </pre>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {prettyPrint(deserializeArticle(initial))}
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
          deserializeArticle(initial)
        )
      )}
    </pre>
  </div>
)
