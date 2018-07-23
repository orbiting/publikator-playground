import { create } from './data'
import { onKeyDown } from './handlers'
import {
  renderNode,
  renderPlaceholder
} from './renderers'

export default {
  onKeyDown,
  renderNode,
  renderPlaceholder,
  getNew: create
}
