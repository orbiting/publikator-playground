import { Fragment } from 'react'
import { compose } from 'ramda'
import {
  reduxForm,
  Field as FormField,
} from 'redux-form'

import {
  Field,
  Button,
  Checkbox,
} from '@project-r/styleguide'

import { withNodeData } from '@orbiting/publikator-editor/apps/nodeData'
import { withTheme } from '@orbiting/publikator-editor/apps/theme'
import RepoSearch from '@orbiting/publikator-editor/components/RepoSearch'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => {
  switch (input.name) {
    case 'title':
    case 'slug':
      return (
        <Field
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
    case 'feed':
    case 'gallery':
      return (
        <p>
          <Checkbox
            {...input}
            error={touched && error}
          >
            {label}
          </Checkbox>
        </p>
      )
    case 'format':
      return (
        <Fragment>
          <RepoSearch label="Format" {...input} />
        </Fragment>
      )
  }
}

export const MetaForm = compose(
  withNodeData({
    factory: (data, onChange) => ({
      initialValues: data.toJS(),
      onSubmit: (...args) =>
        !console.log(args) && onChange(...args),
    }),
  }),
  withTheme(),
  reduxForm({
    form: 'meta',
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
        <FormField
          name="title"
          type="text"
          component={renderField}
          label="Slug"
        />
        <FormField
          name="slug"
          type="text"
          component={renderField}
          label="Titel"
        />
        <FormField
          name="feed"
          type="checkbox"
          component={renderField}
          label="Displays in Feed"
        />
        <FormField
          name="gallery"
          type="checkbox"
          component={renderField}
          label="Image gallery enabled for this article"
        />
        <FormField
          name="format"
          component={renderField}
          label="Format"
        />
        <div>
          <Button
            {...styles.buttons.labelButton}
            type="submit"
            disabled={pristine || submitting}
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

export const MetaUI = ({ node, editor }) => {
  return <MetaForm node={node} editor={editor} />
}
