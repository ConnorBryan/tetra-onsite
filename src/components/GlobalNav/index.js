import { compose, withProps, withState } from 'recompose';
import { withTetraAuth, withTetraUser } from 'src/utils/Auth';
import { withTetraTheme } from 'src/utils/Theme';
import GlobalNav from './render';

export default compose(
  withTetraTheme(),
  withTetraAuth(),
  withTetraUser(),
  withProps(({ tetraAuth: { logout } }) => ({ logout })),
  withState('shouldExpandNavItems', 'setShouldExpandNavItems', false)
)(GlobalNav);
