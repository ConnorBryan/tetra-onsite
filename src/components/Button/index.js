import React from 'react';
import Spinner from 'src/components/Spinner';
import Icon from 'src/components/Icon';
import './styles.scss';

type SIZE_SMALL = 'small';
type SIZE_MEDIUM = 'medium';
type SIZE_BIG = 'big';

type ButtonProps = {
  className?: string,
  disabled?: boolean,
  onClick: () => void,
  showSpinner?: boolean,
  size?: SIZE_SMALL | SIZE_MEDIUM | SIZE_BIG,
  icon?: string,
  text?: string,
};

export default function Button(
  {
    className,
    disabled,
    onClick,
    showSpinner,
    size = 'big',
    icon,
    text,
  }: ButtonProps = {}
) {
  const optionalProps = {};

  if (disabled) {
    optionalProps.disabled = 'disabled';
  }

  return (
    <button
      type="button"
      className={`${className != null ? className : ''} size-${size}`}
      onClick={onClick}
      {...optionalProps}
    >
      <Spinner className="spinner" display-if={showSpinner} />
      {icon != null
        ? <Icon className="icon" glyph={icon} size="small" />
        : null}
      {text}
    </button>
  );
}
