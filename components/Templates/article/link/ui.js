import { compose } from 'ramda'
import {
  fontStyles,
  A
} from '@project-r/styleguide'

import { css } from 'glamor'

import { reduxForm, Field } from 'redux-form'

import LinkIcon from 'react-icons/lib/fa/chain'
import ExternalLinkIcon from 'react-icons/lib/fa/external-link'
import DocumentLinkIcon from 'react-icons/lib/fa/file-text-o'
import AuthorLinkIcon from 'react-icons/lib/fa/user'
import EditIcon from 'react-icons/lib/fa/pencil'

import buttonStyles from '@orbiting/publikator-editor/styles/buttonStyles'
import ToggleInlineButton from '@orbiting/publikator-editor/components/ToggleInlineButton'
import TextInput from '@orbiting/publikator-editor/components/TextInput'
import Button from '@orbiting/publikator-editor/components/Button'
import withNodeData from '@orbiting/publikator-editor/hoc/withNodeData'
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

export const LinkCard = ({ data }) => (
  <div>
    <span {...styles.cardLink}>
      <span>
        {shortString(
          20,
          data.get('title') ||
            shortUrl(data.get('url'))
        )}
      </span>
    </span>
    <span {...styles.cardLabel}>
      {getUrlType(data.get('url'))}
      {' | '}
      <A target="_blank" href={data.get('url')}>
        In neuem Tab öffnen
      </A>
    </span>
  </div>
)

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <TextInput
    renderInput={props => (
      <input
        autoComplete="off"
        {...props}
        {...input}
      />
    )}
    type={type}
    label={label}
    {...input}
    error={touched && error}
  />
)

export const LinkForm = reduxForm({
  form: 'link',
  enableReinitialize: true
})(
  ({
    handleSubmit,
    pristine,
    reset,
    submitting
  }) => {
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="url"
          type="text"
          component={renderField}
          label="URL"
        />
        <Field
          name="title"
          type="text"
          component={renderField}
          label="Titel"
        />
        <div>
          <button
            {...buttonStyles.iconButton}
            type="submit"
            disabled={submitting}
          >
            ok
          </button>
          <button
            {...buttonStyles.iconButton}
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    )
  }
)

export const LinkUI = compose(
  withNodeData(),
  withEditMode({
    namespace: 'link'
  })
)(
  ({
    isInEditMode,
    startEditing,
    finishEditing,
    value: data,
    onChange,
    focusRef
  }) => {
    return !isInEditMode ? (
      <div>
        <LinkCard data={data} />
        <Button
          {...buttonStyles.iconButton}
          onClick={startEditing}
        >
          <EditIcon size="12" />
        </Button>
      </div>
    ) : (
      <LinkForm
        initialValues={data.toJS()}
        onSubmit={v => {
          finishEditing()
          onChange(v)
          focusRef.focus()
        }}
      />
    )
  }
)
