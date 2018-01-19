import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  compose,
  getContext,
  lifecycle,
  withContext,
  withProps,
  withState,
} from 'recompose';
import { func, shape, object } from 'prop-types';
import request, { setUserJwt } from 'src/services/Request';
import { getExpiry, getKeys, set, remove } from 'src/utils/Storage';
import User from 'src/models/User';

function registerUserToMixpanel(user) {
  if (user == null) return;
  window.mixpanel.identify(user.id);
  window.mixpanel.people.set({
    $id: user.id,
    $email: user.email,
    $phoneNumber: user.phoneNumber,
    $firstName: user.firstName,
    $lastName: user.lastName,
    minutesRemaining: user.getRemainingMinutes(),
  });
}

function getTokenExpiryDate(token) {
  let expiryDate = new Date();
  const splitToken = (token || '').split('.');
  if (splitToken.length == 3) {
    const base64Payload = splitToken[1];
    const payload = JSON.parse(window.atob(base64Payload));
    expiryDate = 'exp' in payload ? new Date(payload.exp * 1000) : expiryDate;
  }
  return expiryDate;
}

// tracking `logout` allows external services (like Request) to call it
let logoutFunc = null;
function setLogoutFunc(func) {
  logoutFunc = func;
}
export function logout() {
  if (logoutFunc) logoutFunc();
}

const tetraUserPropType = object;
const tetraAuthPropType = shape({
  update: func.isRequired,
  updateUser: func.isRequired,
  logout: func.isRequired,
}).isRequired;

export function composeWithAuth(WrappedComponent: () => React$Element<*>) {
  return compose(
    withState('bootupFinished', 'setBootupFinished', false),
    withState('user', 'setUser', null),
    withContext(
      {
        tetraUser: tetraUserPropType,
        tetraAuth: tetraAuthPropType,
      },
      ({ user, setUser }) => {
        const logout = () => {
          // Logout mixpanel
          window.mixpanel.reset();

          Promise.all([remove('AUTH_TOKEN'), remove('AUTH_USER')]).then(() => {
            setUserJwt(null);
            setUser(null);
          });
        };

        // expose logout function so Request can call it on 403
        setLogoutFunc(logout);

        const updateUser = user => {
          return getExpiry('AUTH_TOKEN').then(tokenExpiry => {
            set('AUTH_USER', user, tokenExpiry);
            setUser(user);
            registerUserToMixpanel(user);
          });
        };

        const update = token => {
          setUserJwt(token);
          const tokenExpiry = +getTokenExpiryDate(token);
          return request({
            url: `/users/me/`,
            token: token,
          })
            .then(response => {
              const user = new User(response.data);
              set('AUTH_TOKEN', token, tokenExpiry);
              set('AUTH_USER', user, tokenExpiry);
              setUser(user);
              registerUserToMixpanel(user);
              return user;
            })
            .catch(logout); // something bad happened, clear the knowledge of user
        };

        return {
          tetraUser: user != null ? new User(user) : null,
          tetraAuth: { update, updateUser, logout },
        };
      }
    ),
    lifecycle({
      componentDidMount() {
        const { props: { setUser, setBootupFinished } } = this;
        // Check if the user is already logged in
        getKeys(['AUTH_TOKEN', 'AUTH_USER']).then(([token, user]) => {
          if (token && user) {
            setUserJwt(token);
            setUser(user);
          }
          setBootupFinished(true);
        });
      },
    }),
    withTetraUser()
  )(function({ bootupFinished, ...otherProps }) {
    return bootupFinished ? <WrappedComponent {...otherProps} /> : <div />;
  });
}

// adds a `tetraAuth` property for components to use
export function withTetraAuth() {
  return getContext({ tetraAuth: tetraAuthPropType });
}

// adds a `tetraUser` property for components to use
export function withTetraUser() {
  return getContext({ tetraUser: tetraUserPropType });
}

type RedirectWithoutAuthProps = {
  to: string,
};
export function redirectWithoutAuth(
  { to = '/login' }: RedirectWithoutAuthProps = {}
) {
  return function redirect(WrappedComponent: () => React$Element<*>) {
    return compose(
      withTetraUser(),
      withProps(({ tetraUser }) => ({
        isAuthed: tetraUser != null,
      }))
    )(function({ isAuthed }) {
      return isAuthed ? <WrappedComponent /> : <Redirect to={to} />;
    });
  };
}
