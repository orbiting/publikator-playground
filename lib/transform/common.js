const {
  isNil,
  complement,
  uncurryN,
  compose,
  tap,
  unnest,
  filter,
  map,
  converge,
  mergeDeepLeft,
  reduce,
  over,
  both,
  equals,
  ifElse,
  lensProp,
  lensPath,
  view,
  always,
  prop
} = require('ramda')

const update = uncurryN(
  3,
  compose(over, lensProp)
)

const prettyPrint = obj =>
  JSON.stringify(obj, null, 3)

const log = uncurryN(2, msg =>
  tap(n => console.log(msg, n))
)

const notIsNil = complement(isNil)

const safePath = uncurryN(2, path =>
  view(lensPath(path))
)

const safeProp = uncurryN(
  2,
  ifElse(isNil, always, prop)
)

const safePropEq = uncurryN(3, (key, val) =>
  compose(
    both(notIsNil, equals(val)),
    safeProp(key)
  )
)

const cleanFlatMap = uncurryN(
  2,
  compose(unnest, filter(notIsNil), map)
)

const mergeResults = compose(
  converge(
    compose(reduce(mergeDeepLeft, {}), Array.of)
  ),
  Array.of
)

module.exports = {
  notIsNil,
  safeProp,
  safePath,
  safePropEq,
  cleanFlatMap,
  mergeResults,
  log,
  prettyPrint,
  update
}
