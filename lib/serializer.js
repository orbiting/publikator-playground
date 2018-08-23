import { uncurryN, identity, ifElse } from 'ramda'
import {
  withFlatMarks,
  withNestedMarks,
} from '@orbiting/transform/slate'
import { log } from '@orbiting/transform/common'
import { transform } from '@orbiting/transform/transform'
import { isText } from '@orbiting/transform/mdast'

const mdastNotFound = v =>
  log(
    'Skip value. No transformer found for MDAST node:\n',
    v
  ) && null

const slateNotFound = v =>
  log(
    'Skip value. No transformer found for Slate node:\n',
    v
  ) && null

export const deserialize = uncurryN(
  2,
  transformer =>
    transform(
      withFlatMarks(transformer(mdastNotFound))
    )
)

export const serialize = uncurryN(
  2,
  transformer =>
    transform(
      withNestedMarks(transformer(slateNotFound))
    )
)

const withTyped = transformer =>
  ifElse(isText, identity, transformer)

export const toTyped = uncurryN(2, transformer =>
  transform(withTyped(transformer(slateNotFound)))
)
