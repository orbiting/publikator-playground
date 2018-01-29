import actionTypes from '../constants/actionTypes'

import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'title',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A title.'
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A paragraph.'
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'blockquote',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A blockquote.'
              }
            ]
          }
        ]
      },
      {
        object: 'block',
        type: 'infobox',
        nodes: [
          {
            object: 'block',
            type: 'infoboxTitle',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'An infobox title'
                  }
                ]
              }
            ]
          },
          {
            object: 'block',
            type: 'infoboxText',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'A paragraph in an infobox.'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
})

export default (
  value = initialValue,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CHANGE:
      return payload.change.value
    default:
      return value
  }
}
