import { compose, withProps } from 'recompose';
import { setTheme } from 'src/utils/Theme';
import PasswordResetPageRender from './render';
import { getEmailError } from 'src/utils/FormValidators';
import { resetUserPassword } from 'src/services/UserService';
import {
  formatEmailErrors,
  formatNonFieldErrors,
} from 'src/utils/ResponseErrorFormatters';
import formBuilder from 'src/utils/FormBuilder';

const PasswordResetForm = formBuilder({
  fields: [
    {
      name: 'email',
      icon: 'email',
      placeholder: 'John.doe@gmail.com',
      validator: getEmailError,
    },
  ],
  actions: [
    {
      text: 'SEND RESET LINK',
      getIsDisabled: ({ fieldsAreFilled, noErrors }) =>
        !(fieldsAreFilled && noErrors),
      onClick: ({ form: { email } }) =>
        resetUserPassword({ email }).catch(e => {
          const errorMessages = [];
          let formErrorMessage = 'There was an error resetting your password';

          if (e.response && e.response.data) {
            const errors = e.response.data;

            if (errors.email) {
              errorMessages.push({
                field: 'email',
                message: formatEmailErrors(errors.email),
              });
            }

            if (errors.non_field_errors) {
              formErrorMessage = formatNonFieldErrors(errors.non_field_errors);
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
  withProps(() => ({ PasswordResetForm }))
)(PasswordResetPageRender);
