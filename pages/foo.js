import { Document } from 'slate'
import React from 'react'
import { create as createDeserialize } from '../lib/transforms/mdastToSlate'
import { create as createSerialize } from '../lib/transforms/slateToMdast'

import initial from './usa'

import { rules } from '../components/Templates/Article'

const deserialize = createDeserialize(
  rules.map(r => r.fromMdast)
)
const serialize = createSerialize(rules.map(r => r.toMdast))

export default () => (
  <div>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {JSON.stringify(initial, null, 3)}
    </pre>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {JSON.stringify(
        serialize(
          Document.fromJSON(deserialize(initial)).toJSON()
        ),
        null,
        3
      )}
    </pre>
    <pre
      style={{
        float: 'left',
        width: '33%',
        overflow: 'hidden'
      }}
    >
      {JSON.stringify(
        Document.fromJSON(deserialize(initial)).toJSON(),
        null,
        3
      )}
    </pre>
  </div>
)
