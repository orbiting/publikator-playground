import {
  fontStyles,
  colors,
  A
} from '@project-r/styleguide'
import { css } from 'glamor'
import LinkIcon from 'react-icons/lib/fa/chain'
import ExternalLinkIcon from 'react-icons/lib/fa/external-link'
import DocumentLinkIcon from 'react-icons/lib/fa/file-text-o'
import AuthorLinkIcon from 'react-icons/lib/fa/user'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'
import ToggleInlineButton from '@orbiting/publikator-editor/components/ToggleInlineButton'
import TextInput from '@orbiting/publikator-editor/components/TextInput'

const styles = {
  card: {},
  cardLink: css({
    ...fontStyles.sansSerifRegular16,
    display: 'block'
  }),
  cardLabel: css({
    ...fontStyles.sansSerifRegular12
  })
}

const shortString = (threshold, str) =>
  str && str.length > threshold
    ? str.substr(0, threshold - 3).concat('...')
    : str

const shortUrl = str =>
  (str &&
    str.replace(/^http(s?):\/\/(www.)?/g, '')) ||
  ''

const getUrlType = str =>
  /^\/~/.test(str)
    ? 'User'
    : /github\.com/.test(str)
      ? 'Dokument'
      : 'Link'

export const LinkButton = props => (
  <ToggleInlineButton
    inline={'link'}
    {...props}
    {...buttonStyles.iconButton}
  >
    <LinkIcon size={22} />
  </ToggleInlineButton>
)

export const LinkUrlInput = withNodeData('url')(
  props => <TextInput label="URL" {...props} />
)

export const LinkTitleInput = withNodeData(
  'title'
)(props => <TextInput label="Titel" {...props} />)

export const LinkCard = ({ node }) => (
  <div>
    <span {...styles.cardLink}>
      <span>
        {shortString(
          20,
          node.data.get('title') ||
            shortUrl(node.data.get('url'))
        )}
      </span>
    </span>
    <span {...styles.cardLabel}>
      {getUrlType(node.data.get('url'))}
      {' | '}
      <A
        target="_blank"
        href={node.data.get('url')}
      >
        Profil
      </A>
    </span>
  </div>
)
