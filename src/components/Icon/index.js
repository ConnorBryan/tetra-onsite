import React from 'react';
import classnames from 'classnames';
import './styles.scss';

type SIZE_BIG = 'big';
type SIZE_MEDIUM = 'medium';
type SIZE_SMALL = 'small';

type IconProps = {
  className?: string,
  color?: string,
  glyph: string,
  size?: SIZE_BIG | SIZE_MEDIUM | SIZE_SMALL,
  onClick?: ((any) => void) => void,
};

export default function Icon({
  className,
  color,
  glyph,
  size = 'medium',
  onClick,
}: IconProps) {
  const iconStyle = {};

  if (color != null) {
    iconStyle.color = color;
  }

  const classNames = classnames('material-icons', `size-${size}`, className);

  return (
    <span onClick={onClick} className={classNames} style={iconStyle}>
      {glyph}
    </span>
  );
}
