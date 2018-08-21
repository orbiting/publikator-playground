import { combineReducers } from 'redux'
import editorReducers from '@orbiting/publikator-editor/reducers'

/*
  All env vars
*/
const ENV =
  typeof window !== 'undefined' &&
  window.__NEXT_DATA__
    ? window.__NEXT_DATA__.env
    : process.env

/*
  Github stuff
*/
export const GITHUB_ORG = ENV.GITHUB_ORG
export const REPO_PREFIX = ENV.REPO_PREFIX
/*

  Backend vars
*/
export const API_URL = ENV.API_URL
export const API_WS_URL = ENV.API_WS_URL
export const API_ASSETS_URL = ENV.API_ASSETS_URL

/*
  Styleguide
*/
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

/*
  redux
*/
import { reducer as form } from 'redux-form'

export const reducer = combineReducers({
  form,
  ...editorReducers,
})
