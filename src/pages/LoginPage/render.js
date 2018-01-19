import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from 'src/components/GlobalNav';
import './styles.scss';

type LoginPageProps = {
  LoginForm: () => React$Element<*>,
  history: any,
};

export default function LoginPage({ LoginForm, history }: LoginPageProps) {
  return (
    <div className="loginPage">
      <GlobalNav />

      <div className="formPage">
        <div className="header">Login</div>

        <div className="pageContents">
          <LoginForm onSuccess={() => history.push('/')} />

          <div className="footer">
            or <Link to="/password-reset">reset your password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
