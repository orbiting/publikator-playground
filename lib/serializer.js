import { uncurryN } from 'ramda'
import {
  withFlatMarks,
  withNestedMarks,
} from '@orbiting/transform/slate'
import { log } from '@orbiting/transform/common'
import { transform } from '@orbiting/transform/transform'

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
