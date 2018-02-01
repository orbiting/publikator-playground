import { Value } from 'slate'

import actionTypes from '../constants/actionTypes'

export const initialState = Value.fromJSON({
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
        type: 'figure',
        nodes: [
          {
            object: 'block',
            type: 'image',
            isVoid: true,
            data: {
              src:
                '/static/images/guild_wars_2_artwork_1.jpg',
              title: 'Foo'
            }
          },
          {
            object: 'block',
            type: 'caption',
            nodes: [
              {
                object: 'block',
                type: 'captionText',
                nodes: [
                  {
                    object: 'text',
                    leaves: [
                      {
                        text: ''
                      }
                    ]
                  }
                ]
              },
              {
                object: 'block',
                type: 'byline',
                nodes: [
                  {
                    object: 'text',
                    leaves: [
                      {
                        text: ''
                      }
                    ]
                  }
                ]
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
  value = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CHANGE:
      return payload.change.value

    default:
      return value
  }
}
