import { compose, withProps } from 'recompose';
import { setTheme } from 'src/utils/Theme';
import { withRouter } from 'react-router';
import LoginPageRender from './render';
import { getEmailError, getPasswordError } from 'src/utils/FormValidators';
import { loginUser } from 'src/services/UserService';
import {
  formatEmailErrors,
  formatPasswordErrors,
  formatNonFieldErrors,
} from 'src/utils/ResponseErrorFormatters';
import formBuilder from 'src/utils/FormBuilder';

const LoginForm = formBuilder({
  fields: [
    {
      name: 'email',
      icon: 'email',
      placeholder: 'John.doe@me.com',
      validator: getEmailError,
    },
    {
      name: 'password',
      icon: 'lock_outline',
      placeholder: 'Password',
      validator: getPasswordError,
      type: 'password',
    },
  ],
  actions: [
    {
      text: 'SIGN IN',
      getIsDisabled: ({ fieldsAreFilled, noErrors }) =>
        !(fieldsAreFilled && noErrors),
      onClick: ({ onSuccess, tetraAuth, form: { email, password } }) =>
        loginUser({ email, password })
          .then(({ token }) => {
            tetraAuth.update(token).then(onSuccess);
          })
          .catch(e => {
            const errorMessages = [];
            let formErrorMessage = 'There was an error logging in.';

            if (e.response && e.response.data) {
              const errors = e.response.data;

              if (errors.email) {
                errorMessages.push({
                  field: 'email',
                  message: formatEmailErrors(errors.email),
                });
              }

              if (errors.password) {
                errorMessages.push({
                  field: 'password',
                  message: formatPasswordErrors(errors.password),
                });
              }

              if (errors.non_field_errors) {
                formErrorMessage = formatNonFieldErrors(
                  errors.non_field_errors
                );
              }
            }

            errorMessages.push({ field: 'form', message: formErrorMessage });
            throw errorMessages;
          }),
    },
  ],
});

export default compose(
  setTheme('red'),
  withRouter,
  withProps(() => ({ LoginForm }))
)(LoginPageRender);
