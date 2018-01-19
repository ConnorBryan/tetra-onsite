import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'src/components/Icon';
import './styles.scss';

type GlobalNavButtonProps = {
  to: string,
  onClick: () => void,
  icon: string,
  text: string,
  isActive: boolean,
  tetraTheme: any,
};

export default function GlobalNavButton(
  { to, onClick, icon, text, isActive, tetraTheme }: GlobalNavButtonProps = {}
) {
  const ButtonTemplate = (
    <button
      onClick={onClick != null ? onClick : null}
      className={isActive ? tetraTheme.name + ' active' : tetraTheme.name}
      type="button"
    >
      {icon != null ? <Icon glyph={icon} size="medium" /> : null}
      {text != null
        ? <div className="label">
            {text}
          </div>
        : null}
    </button>
  );

  if (to == null) {
    return ButtonTemplate;
  }

  return (
    <Link to={to} className="navLink">
      {ButtonTemplate}
    </Link>
  );
}
