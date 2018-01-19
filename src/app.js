import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { composeWithTheme } from 'src/utils/Theme';
import { composeWithAuth, withTetraUser } from 'src/utils/Auth';
import User from 'src/models/User';
import NotebookPage from 'src/pages/NotebookPage';
import LoginPage from 'src/pages/LoginPage';
import RegistrationPage from 'src/pages/RegistrationPage';
import VerifyPage from 'src/pages/VerifyPage';
import PasswordResetPage from 'src/pages/PasswordResetPage';
import PasswordConfirmPage from 'src/pages/PasswordConfirmPage';
import DocumentPage from 'src/pages/DocumentPage';
import Homepage from 'src/pages/Homepage';
import PricingPage from 'src/pages/PricingPage';

// import 'src/global-styles/normalize.css';
// import 'src/global-styles/flexboxgrid.min.css';
// import 'src/global-styles/GlobalStyles.scss';

const AppContainer = compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      window.mixpanel.time_event('App Session');
    },
    componentWillUnmount() {
      window.mixpanel.track('App Session');
    },
  })
)(({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
});

type AppProps = {
  hasNav: boolean,
  tetraUser: User,
};
function App({ tetraUser }: AppProps = {}) {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <AppContainer>
        <div>
          <div className="page">
            <Route
              exact
              path="/"
              component={tetraUser != null ? NotebookPage : Homepage}
            />
            <Route exact path="/pricing" component={PricingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/verify" component={VerifyPage} />
            <Route exact path="/password-reset" component={PasswordResetPage} />
            <Route
              exact
              path="/password-confirm"
              component={PasswordConfirmPage}
            />
            <Route exact path="/share/:shareCode" component={DocumentPage} />
            <Route exact path="/docs/:code" component={DocumentPage} />
          </div>
        </div>
      </AppContainer>
    </Router>
  );
}

const AppWithAuth = composeWithAuth(composeWithTheme(withTetraUser()(App)));

ReactDOM.render(
  React.createElement(AppWithAuth),
  document.getElementById('application')
);
