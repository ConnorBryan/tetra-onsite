import { compose, lifecycle } from 'recompose';
import User from 'src/models/User';
import { withTetraUser } from 'src/utils/Auth';

type BootIntercomArgs = {
  user?: User,
  data?: Object,
};
export function bootIntercom({ user, data = {} }: BootIntercomArgs = {}) {
  if (user != null) {
    data = Object.assign(data, {
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
  window.Intercom('boot', {
    app_id: CONFIG.INTERCOM_APP_ID,
    ...data,
  });
}

type UpdateIntercomArgs = {
  user: User,
  data: Object,
};
export function updateIntercom({ user, data = {} }: UpdateIntercomArgs = {}) {
  if (user != null) {
    data = Object.assign(data, {
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }
  window.Intercom('update', data);
}

export function showIntercomMessage(message: string) {
  window.Intercom('showNewMessage', message);
}

export function showIntercom() {
  window.Intercom('show');
}

export function hideIntercom() {
  window.Intercom('hide');
}

export function shutdownIntercom() {
  window.Intercom('shutdown');
}

export function withIntercom(withPropsForIntercom?: any = () => {}) {
  /**
   * Add this HoC to a component to start an intercom session on that page
   */
  return compose(
    withTetraUser(),
    lifecycle({
      componentDidMount() {
        const { tetraUser } = this.props;
        if (tetraUser != null) {
          bootIntercom({
            user: tetraUser,
            data: withPropsForIntercom(this.props),
          });
        } else {
          bootIntercom({ data: withPropsForIntercom(this.props) });
        }
      },
      componentWillUnmount() {
        shutdownIntercom();
      },
    })
  );
}
