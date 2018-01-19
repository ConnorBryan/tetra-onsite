import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router';
import { setTheme } from 'src/utils/Theme';
import queryString from 'query-string';
import PasswordConfirmPageRender from './render';
import { getPasswordError } from 'src/utils/FormValidators';
import { confirmUserPassword } from 'src/services/UserService';
import {
  formatNonFieldErrors,
  formatPasswordErrors,
} from 'src/utils/ResponseErrorFormatters';
import formBuilder from 'src/utils/FormBuilder';

const PasswordConfirmForm = formBuilder({
  fields: [
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
      text: 'CHANGE PASSWORD',
      getIsDisabled: ({ fieldsAreFilled, noErrors }) =>
        !(fieldsAreFilled && noErrors),
      onClick: ({ onSuccess, tetraAuth, uid, token, form: { password } }) =>
        confirmUserPassword({ uid, token, password })
          .then(({ token }) => {
            tetraAuth.update(token).then(onSuccess);
          })
          .catch(e => {
            const errorMessages = [];
            let formErrorMessage = 'There was an error resetting your password';

            if (e.response && e.response.data) {
              const errors = e.response.data;

              if (errors.password) {
                errorMessages.push({
                  type: 'password',
                  message: formatPasswordErrors(errors.password),
                });
              }

              if (errors.uid) {
                formErrorMessage = errors.uid[0];
              }

              if (errors.token) {
                formErrorMessage = errors.token[0];
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
  withProps(({ location }) => {
    const queryParams = queryString.parse(location.search);
    return {
      uid: queryParams.uid,
      token: queryParams.token,
    };
  }),
  withProps(() => ({ PasswordConfirmForm }))
)(PasswordConfirmPageRender);
