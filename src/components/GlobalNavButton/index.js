import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router';
import { withTetraTheme } from 'src/utils/Theme';
import GlobalNavButton from './render';

export default compose(
  withTetraTheme(),
  withRouter,
  withProps(({ to, location: { pathname } }) => ({ isActive: to == pathname }))
)(GlobalNavButton);
