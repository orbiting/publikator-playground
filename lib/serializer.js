import { uncurryN } from 'ramda'
import {
  withFlatMarks,
  withNestedMarks
} from './transform/slate'
import { log } from './transform/common'

import { transform } from './transform/transform'

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

export const deserialize = uncurryN(2, rule =>
  transform(withFlatMarks(rule(mdastNotFound)))
)

export const serialize = uncurryN(2, rule =>
  transform(withNestedMarks(rule(slateNotFound)))
)
