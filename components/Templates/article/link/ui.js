import { compose } from 'ramda'
import {
  fontStyles,
  A
} from '@project-r/styleguide'

import { css } from 'glamor'
import LinkIcon from 'react-icons/lib/fa/chain'
import ExternalLinkIcon from 'react-icons/lib/fa/external-link'
import DocumentLinkIcon from 'react-icons/lib/fa/file-text-o'
import AuthorLinkIcon from 'react-icons/lib/fa/user'
import EditIcon from 'react-icons/lib/fa/pencil'
import OkIcon from 'react-icons/lib/fa/check'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import Button from '@orbiting/publikator-editor/components/Button'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'
import ToggleInlineButton from '@orbiting/publikator-editor/components/ToggleInlineButton'
import TextInput from '@orbiting/publikator-editor/components/TextInput'
import { withEditMode } from '@orbiting/publikator-editor/apps/editMode'

const styles = {
  card: css({
    marginBottom: '15px'
  }),
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

export const LinkButton = props => {
  return (
    <ToggleInlineButton
      inline={'link'}
      {...props}
      {...buttonStyles.iconButton}
    >
      <LinkIcon size={22} />
    </ToggleInlineButton>
  )
}

export const LinkUrlInput = withNodeData('url')(
  props => <TextInput label="URL" {...props} />
)

export const LinkTitleInput = withNodeData(
  'title'
)(props => <TextInput label="Title" {...props} />)

export const LinkCard = ({ node }) => (
  <div {...styles.card}>
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
        In neuem Tab öffnen
      </A>
    </span>
  </div>
)

export const LinkForm = compose(
  withEditMode({ namespace: 'link' })
)(props => {
  const {
    node,
    editor,
    isEditing,
    focusRef,
    startEditing,
    finishEditing
  } = props
  const showForm =
    !node.data.get('url') || isEditing
  return (
    <div>
      {showForm && (
        <form
          onSubmit={e => {
            e.preventDefault()
            finishEditing()
          }}
        >
          <LinkUrlInput
            node={node}
            editor={editor}
            renderInput={inputProps => (
              <input
                {...inputProps}
                ref={focusRef}
              />
            )}
          />
          <LinkTitleInput
            node={node}
            editor={editor}
          />
          <Button
            type="submit"
            {...buttonStyles.iconButton}
            onClick={finishEditing}
          >
            <OkIcon size="16" />
          </Button>
        </form>
      )}
      {!showForm && <LinkCard node={node} />}
      {!showForm && (
        <Button
          {...buttonStyles.iconButton}
          onClick={startEditing}
        >
          <EditIcon size="22" />
        </Button>
      )}
    </div>
  )
})
