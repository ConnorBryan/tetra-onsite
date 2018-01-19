import request from 'src/services/Request';
import User from 'src/models/User';
import Plan from 'src/models/Plan';

export function addToWaitlist(email: string, provider: string) {
  return request({
    method: 'post',
    url: '/waitlists/video_conference/',
    data: { email_address: email, provider },
  });
}

type RegisterUserArguments = {
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  password: string,
};
export function registerUser({
  email,
  phone,
  firstName,
  lastName,
  password,
}: RegisterUserArguments): Promise<{ token: string }> {
  return (request({
    method: 'post',
    url: '/users/',
    data: {
      email,
      phone_number: phone,
      first_name: firstName,
      last_name: lastName,
      password,
    },
  }): any).then(({ data }: { data: { token: string } }) => data);
}

type LoginUserArguments = {
  email: string,
  password: string,
};
export function loginUser({ email, password }: LoginUserArguments) {
  return (request({
    method: 'post',
    url: '/auth/login/',
    data: { email, password },
  }): any).then(({ data }: { data: { token: string } }) => data);
}

export function getCurrentUser() {
  return request({
    method: 'get',
    url: '/users/me/',
  }).then(({ data }) => new User(data));
}

type ChangeUserArguments = {
  phoneNumber: string,
  firstName: string,
  lastName: string,
};
export function changeUser({
  phoneNumber,
  firstName,
  lastName,
}: ChangeUserArguments) {
  return request({
    method: 'patch',
    url: '/users/me/',
    data: {
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
    },
  }).then(({ data }) => new User(data));
}

type ChangeUserPasswordArguments = {
  oldPassword: string,
  newPassword: string,
};
export function changeUserPassword({
  oldPassword,
  newPassword,
}: ChangeUserPasswordArguments): Promise<{ token: string }> {
  return (request({
    method: 'put',
    url: '/users/me/password/',
    data: {
      old_password: oldPassword,
      new_password: newPassword,
    },
  }): any).then(({ data }) => data);
}

type ResetUserPasswordArguments = {
  email: string,
};
export function resetUserPassword({ email }: ResetUserPasswordArguments) {
  return request({
    method: 'post',
    url: '/users/me/password-reset/',
    data: { email },
  }).then(({ data }) => data);
}

type ConfirmUserPasswordArguments = {
  password: string,
  uid: string,
  token: string,
};
export function confirmUserPassword({
  password,
  uid,
  token,
}: ConfirmUserPasswordArguments): Promise<{ token: string }> {
  return (request({
    method: 'put',
    url: '/users/me/password-reset/',
    data: { new_password: password, uid, token },
  }): any).then(({ data }) => data);
}

type UpdateUserPlanArguments = {
  plan: Plan,
  cardToken?: string | null,
};
export function updateUserPlan({ plan, cardToken }: UpdateUserPlanArguments) {
  const requestPayload: { customer: { [key: string]: any } } = {
    customer: {
      subscription: {
        plan: { name: plan.name },
      },
    },
  };

  if (cardToken != null) {
    requestPayload.customer.default_card = cardToken;
  }

  return request({
    method: 'patch',
    url: `/users/me/`,
    data: requestPayload,
  }).then(({ data }) => new User(data));
}

export function unsubscribeUser() {
  const requestPayload = {
    customer: {
      subscription: {
        plan: null,
      },
    },
  };

  return request({
    method: 'patch',
    url: `/users/me/`,
    data: requestPayload,
  }).then(({ data }) => new User(data));
}
