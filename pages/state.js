import React from 'react'

import initial from './usa'

import Article from '../lib/transformers'
import {
  deserialize,
  serialize
} from '../lib/serializer'
import { prettyPrint } from '../lib/transform/common'
import {
  parse,
  stringify
} from '@orbiting/remark-preset'

const containerStyle = {
  width: 'max-content'
}

const columnStyle = {
  float: 'left',
  width: '500px',
  overflow: 'hidden'
}

const deserializeArticle = deserialize(
  Article.fromMdast
)

const serializeArticle = serialize(
  Article.toMdast
)

export default () => (
  <div style={containerStyle}>
    <pre style={columnStyle}>{initial}</pre>
    <pre style={columnStyle}>
      {prettyPrint(parse(initial))}
    </pre>
    <pre style={columnStyle}>
      {prettyPrint(
        deserializeArticle(parse(initial))
      )}
    </pre>
    <pre style={columnStyle}>
      {prettyPrint(
        serializeArticle(
          deserializeArticle(parse(initial))
        )
      )}
    </pre>
    <pre
      style={{
        ...columnStyle,
        ...{
          whiteSpace: 'pre-wrap'
        }
      }}
    >
      {prettyPrint(
        stringify(
          serializeArticle(
            deserializeArticle(parse(initial))
          )
        )
      )}
    </pre>
  </div>
)
