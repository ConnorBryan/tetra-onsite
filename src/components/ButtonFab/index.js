import React from 'react';
import Icon from 'src/components/Icon';
import './styles.scss';

type SIZE_SMALL = 'small';

type COLOR_RED = 'red';
type COLOR_GREY = 'grey';
type COLOR_OPAQUE = 'opaque';

type ButtonFabProps = {
  disabled?: boolean,
  onClick?: () => any,
  color?: COLOR_RED | COLOR_GREY | COLOR_OPAQUE,
  size?: SIZE_SMALL,
  icon: string,
  iconColor?: string,
};

export default function ButtonFab({
  disabled,
  onClick,
  color = 'red',
  size = 'small',
  icon,
  iconColor = 'white',
}: ButtonFabProps) {
  const optionalProps = {};

  if (disabled) {
    optionalProps.disabled = 'disabled';
  }

  return (
    <button
      type="button"
      className={`color-${color} size-${size}`}
      onClick={onClick}
      {...optionalProps}
    >
      {icon != null
        ? <Icon glyph={icon} color={iconColor} size="small" />
        : null}
    </button>
  );
}
