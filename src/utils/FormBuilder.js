import React from 'react';
import { compose, withProps, withReducer } from 'recompose';
import { withTetraAuth, withTetraUser } from 'src/utils/Auth';
import Icon from 'src/components/Icon';
import TextInput from 'src/components/form/TextInput';
import TextArea from 'src/components/form/TextArea';
import Button from 'src/components/Button';
import './FormBuilder.scss';

const SET_FIELD = 'SET_FIELD';

type FormRowProps = {
  className: string,
  name: string,
  value: string,
  icon?: string,
  placeholder: string,
  validate: () => void,
  transformValue?: string => string,
  type?: string,
  fieldError: string,
  updateForm: ({
    type: string,
    payload: { field: string, value: string },
  }) => void,
};

function FormRow({
  className,
  name,
  value,
  icon,
  placeholder,
  validate,
  transformValue = value => value,
  type = 'text',
  fieldError,
  updateForm,
}: FormRowProps) {
  const fieldErrorClassName = fieldError ? 'fieldError' : '';

  let InputComponent = TextInput;
  if (type === 'textarea') {
    InputComponent = TextArea;
  }

  return (
    <div className={`formRow ${className} ${name}-row`}>
      {icon
        ? <Icon className={`formIcon ${className}`} glyph={icon} color="#555" />
        : null}
      <InputComponent
        name={name}
        value={value}
        className={`${className} ${fieldErrorClassName}`}
        placeholder={placeholder}
        onBlur={() => validate()}
        onChange={({ value }) =>
          updateForm({
            type: SET_FIELD,
            payload: { field: name, value: transformValue(value) },
          })}
        type={type}
      />
      <div className="fieldErrorText">
        {fieldError}
      </div>
    </div>
  );
}

type FormBuilderField = {
  name: string,
  icon?: string,
  placeholder: string,
  validator?: string => string | null,
  transformValue?: string => string,
  type?: string,
  required?: boolean,
};

type FormBuilderAction = {
  text: string,
  getIsDisabled: ({ fieldsAreFilled: boolean, noErrors: boolean }) => boolean,
  onClick: ({ [key: string]: any }) => Promise<*>,
};

type FormBuilderArguments = {
  fields: Array<FormBuilderField>,
  actions: Array<FormBuilderAction>,
};

export default function formBuilder({
  fields = [],
  actions = [],
}: FormBuilderArguments) {
  // build `initialState` object containing a value and error key/value for every field
  // also has `actionInProcess` to track executing actions and `formError` to hold the global form error state
  const initialState = fields.reduce(
    (initialState, { name }) => {
      initialState[name] = null;
      initialState[`${name}Error`] = null;
      return initialState;
    },
    {
      actionInProcess: false,
      formError: null,
    }
  );

  return compose(
    // allow tetraAuth and tetraUser to be exposed to `onClick` handlers
    withTetraAuth(),
    withTetraUser(),
    // manage the form state
    withReducer(
      'form',
      'updateForm',
      (state, { type, payload: { field, value } }) => {
        if (type === SET_FIELD) {
          return { ...state, [field]: value };
        } else {
          return state;
        }
      },
      initialState
    ),
    withProps(({ form, initialValues = {} }) => {
      fields.forEach(field => {
        if (form[field.name] == null) {
          form[field.name] =
            initialValues[field.name] != null ? initialValues[field.name] : '';
        }
      });
    }),
    // compute `fieldsAreFilled` and `noErrors` values which are passed to `getIsDisabled` methods
    withProps(({ form }) => {
      // verify that all fields are filled out and there are no errors
      const fieldsAreFilled = fields.reduce(
        (fieldsAreFilled, { name, required = true }) => {
          // if `fieldsAreFilled` has been set to false, keep it that way
          if (fieldsAreFilled) return fieldsAreFilled;
          return !!form[name] || !required;
        },
        true
      );

      const noErrors = fields.reduce((noErrors, { name }) => {
        // if `fieldsAreFilled` has been set to false, keep it that way
        if (noErrors === false) return noErrors;

        const fieldErrorName = `${name}Error`;
        return form[fieldErrorName] == null;
      }, true);

      return { fieldsAreFilled, noErrors };
    })
  )(function Form({
    fieldsAreFilled,
    noErrors,
    onSuccess,
    className,
    form,
    updateForm,
    tetraAuth,
    tetraUser,
    ...otherProps
  }) {
    return (
      <div className={className}>
        {fields.map(
          ({ name, icon, placeholder, validator, transformValue, type }) => {
            const fieldErrorName = `${name}Error`;
            const fieldError = form[fieldErrorName];
            const fieldValue = form[name];
            const validate = () => {
              if (validator) {
                const newFieldError = validator(fieldValue);
                if (newFieldError !== fieldError) {
                  updateForm({
                    type: SET_FIELD,
                    payload: { field: fieldErrorName, value: newFieldError },
                  });
                }
              }
            };
            return (
              <FormRow
                key={name}
                className={className}
                name={name}
                value={fieldValue}
                placeholder={placeholder}
                icon={icon}
                fieldError={fieldError}
                updateForm={updateForm}
                validate={validate}
                transformValue={transformValue}
                type={type}
              />
            );
          }
        )}

        <div className="centered-x">
          <div className="formError">
            {form.formError}
          </div>
          {actions.map(({ text, getIsDisabled, onClick }) => {
            const isDisabled =
              !!form.actionInProcess ||
              getIsDisabled({ fieldsAreFilled, noErrors });

            const wrappedOnClick = () => {
              updateForm({
                type: SET_FIELD,
                payload: { field: 'actionInProcess', value: text },
              });
              updateForm({
                type: SET_FIELD,
                payload: { field: 'formError', value: null },
              });

              onClick({ form, onSuccess, tetraAuth, tetraUser, ...otherProps })
                .catch(e => {
                  if (Array.isArray(e)) {
                    // array of errors that map to the form fields
                    e.forEach(({ field, message }) => {
                      updateForm({
                        type: SET_FIELD,
                        payload: { field: `${field}Error`, value: message },
                      });
                    });
                  } else {
                    // single error, cast to string and report it
                    updateForm({
                      type: SET_FIELD,
                      payload: { field: 'formError', value: e },
                    });
                  }
                })
                .then(() => {
                  updateForm({
                    type: SET_FIELD,
                    payload: { field: 'actionInProcess', value: null },
                  });
                });
            };

            return (
              <Button
                key={text}
                showSpinner={form.actionInProcess === text}
                text={text}
                size="big"
                disabled={isDisabled}
                onClick={wrappedOnClick}
              />
            );
          })}
        </div>
      </div>
    );
  });
}
