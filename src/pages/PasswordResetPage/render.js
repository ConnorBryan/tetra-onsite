import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNav from 'src/components/GlobalNav';
import './styles.scss';

type PasswordResetPageProps = {
  PasswordResetForm: () => React$Element<*>,
};

export default function PasswordResetPage({
  PasswordResetForm,
}: PasswordResetPageProps) {
  return (
    <div className="passwordResetPage">
      <GlobalNav />
      <div className="formPage">
        <div className="header">Password Reset</div>
        <div className="pageContents">
          <PasswordResetForm />

          <div className="footer">
            or <Link to="/login">back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
