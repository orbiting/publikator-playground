import { compose } from 'ramda'
import { Label, A } from '@project-r/styleguide'
import { css } from 'glamor'
import { reduxForm, Field } from 'redux-form'

import { FaLink as LinkIcon } from 'react-icons/fa'
import { MdClose as CloseIcon } from 'react-icons/md'

import ToggleInlineButton from '@orbiting/publikator-editor/components/ToggleInlineButton'
import TextInput from '@orbiting/publikator-editor/components/TextInput'
import Button from '@orbiting/publikator-editor/components/Button'
import Selected from '@orbiting/publikator-editor/components/Selected'
import { SidebarBottom } from '@orbiting/publikator-editor/components/UI'
import { withNodeData } from '@orbiting/publikator-editor/apps/nodeData'
import { withEditMode } from '@orbiting/publikator-editor/apps/editMode'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'

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

export const LinkButton = withTheme()(props => {
  return (
    <ToggleInlineButton
      inline={'link'}
      {...props}
      {...props.styles.buttons.iconButton}
    >
      <LinkIcon size={22} />
    </ToggleInlineButton>
  )
})

const withCardStyles = withTheme(({ theme }) => ({
  card: css({
    marginBottom: '15px',
  }),
  cardLink: css({
    ...theme.fontStyles.sansSerifRegular16,
    display: 'block',
  }),
  cardLabel: css({
    ...theme.fontStyles.sansSerifRegular12,
  }),
}))

export const LinkCard = withCardStyles(
  ({ data, styles }) => (
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
      <Label>
        {getUrlType(data.get('url'))}
        {' | '}
        <A target="_blank" href={data.get('url')}>
          In neuem Tab öffnen
        </A>
      </Label>
    </div>
  )
)

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
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

export const LinkForm = compose(
  withTheme(),
  reduxForm({
    form: 'link',
    enableReinitialize: true,
  })
)(
  ({
    handleSubmit,
    pristine,
    reset,
    submitting,
    styles,
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
          <Button
            {...styles.buttons.labelButton}
            type="submit"
            disabled={submitting}
            onClick={() => {}}
          >
            OK
          </Button>
          <Button
            {...styles.buttons.labelButton}
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Rückgängig
          </Button>
        </div>
      </form>
    )
  }
)

export const LinkUI = compose(
  withTheme(),
  withNodeData({ passProps: true }),
  withEditMode({
    namespace: 'link',
  })
)(
  ({
    node,
    isInEditMode,
    startEditing,
    finishEditing,
    value: data,
    onChange,
    styles,
  }) => {
    return (
      <Selected node={node}>
        <SidebarBottom>
          {!isInEditMode ? (
            <div {...styles.layout.container}>
              <div {...styles.sectionHeader}>
                <Label>Link</Label>
              </div>
              <LinkCard data={data} />
              <Button
                {...styles.buttons.iconButton}
                onClick={startEditing}
              >
                Bearbeiten
              </Button>
            </div>
          ) : (
            <div {...styles.layout.container}>
              <div {...styles.sectionHeader}>
                <Label>Link</Label>
                <Button
                  {...styles.buttons.iconButton}
                  onClick={() => {
                    finishEditing()
                    // editor.focus()
                  }}
                >
                  <CloseIcon size="18" />
                </Button>
              </div>
              <hr {...styles.layout.hairline} />
              <LinkForm
                initialValues={data.toJS()}
                onSubmit={v => {
                  finishEditing()
                  onChange(v)
                }}
              />
            </div>
          )}
        </SidebarBottom>
      </Selected>
    )
  }
)
