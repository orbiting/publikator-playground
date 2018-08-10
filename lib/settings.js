import { combineReducers } from 'redux'
import editorReducers from '../components/Editor/reducers'

const ENV =
  typeof window !== 'undefined' &&
  window.__NEXT_DATA__
    ? window.__NEXT_DATA__.env
    : process.env

export const SG_COLORS = ENV.SG_COLORS
export const SG_FONT_FAMILIES =
  ENV.SG_FONT_FAMILIES
export const SG_FONT_FACES = ENV.SG_FONT_FACES
export const SG_LOGO_PATH = ENV.SG_LOGO_PATH
export const SG_LOGO_VIEWBOX = ENV.SG_LOGO_VIEWBOX
export const SG_BRAND_MARK_PATH =
  ENV.SG_BRAND_MARK_PATH
export const SG_BRAND_MARK_VIEWBOX =
  ENV.SG_BRAND_MARK_VIEWBOX

// import { reducer as formReducer } from 'redux-form'

export const reducer = combineReducers({
  // form: formReducer,
  ...editorReducers
})
