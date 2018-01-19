import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from 'src/components/GlobalNav';
import './styles.scss';

type PasswordConfirmPageProps = {
  uid: string,
  token: string,
  PasswordConfirmForm: () => React$Element<*>,
  history: any,
};

export default function PasswordConfirmPage({
  uid,
  token,
  PasswordConfirmForm,
  history,
}: PasswordConfirmPageProps) {
  return (
    <div className="passwordConfirmPage">
      <GlobalNav />

      <div className="formPage">
        <div className="header">Password Reset</div>
        <div className="pageContents">
          <PasswordConfirmForm
            onSuccess={() => history.push('/')}
            uid={uid}
            token={token}
          />

          <div className="footer">
            or <Link to="/login">back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
