import React from 'react';
import { Link } from 'react-router-dom';
import GlobalNavButton from 'src/components/GlobalNavButton';
import User from 'src/models/User';
import Icon from 'src/components/Icon';
import NavLogo from './GlobalNavLogo.svg';
import MediaQuery from 'react-responsive';
import './styles.scss';

type GlobalNavProps = {
  tetraUser: User,
  tetraTheme: any,

  logout: () => {},
  theme: string,
  shouldExpandNavItems: boolean,
  setShouldExpandNavItems: boolean => void,
};

type NavContentProps = {
  visible: boolean,
  tetraUser: User,
  logout: () => {},
};

function NavContent({ visible, tetraUser, logout }: NavContentProps) {
  return (
    <div className={`navDropdownContent ${visible ? 'visible' : ''}`}>
      <GlobalNavButton
        display-if={tetraUser != null}
        to="/"
        icon="home"
        text="home"
      />
      <GlobalNavButton
        display-if={tetraUser != null}
        onClick={() => logout()}
        icon="exit_to_app"
        text="logout"
      />
      <GlobalNavButton
        display-if={tetraUser == null}
        to="/login"
        icon="fingerprint"
        text="login"
      />
    </div>
  );
}

const DropdownButton = ({ onClick }: { onClick: () => any }) =>
  <button onClick={onClick} className="navDropdownButton">
    <Icon glyph="menu" color="white" />
  </button>;

export default function GlobalNav({
  tetraUser,
  tetraTheme,

  shouldExpandNavItems,
  setShouldExpandNavItems,
  logout,
}: GlobalNavProps) {
  const isSmallScreenQuery = '(max-width: 768px)';
  const isBigScreenQuery = '(min-width: 768px)';

  const toggleShouldExpandNavItems = () => {
    setShouldExpandNavItems(!shouldExpandNavItems);
  };

  return (
    <header className={'globalNav ' + tetraTheme.name}>
      <div className="navHeader">
        <div className="logoWrapper">
          <Link display-if={tetraUser != null} to="/">
            <img className="logoImage" src={NavLogo} />
          </Link>
          <a display-if={tetraUser == null} href="https://asktetra.com">
            <img className="logoImage" src={NavLogo} />
          </a>
        </div>

        <MediaQuery query={isBigScreenQuery}>
          <NavContent visible tetraUser={tetraUser} logout={logout} />
        </MediaQuery>

        <MediaQuery query={isSmallScreenQuery}>
          <DropdownButton onClick={toggleShouldExpandNavItems} />
        </MediaQuery>
      </div>

      <MediaQuery query={isSmallScreenQuery}>
        <NavContent
          visible={shouldExpandNavItems}
          tetraUser={tetraUser}
          logout={logout}
        />
      </MediaQuery>
    </header>
  );
}
