import React from 'react';
import classnames from 'classnames';
import './styles.scss';

type COLOR_WHITE = 'white';
type COLOR_RED = 'red';

type SpinnerProps = {
  color?: COLOR_WHITE | COLOR_RED,
  size: number,
  className?: string,
};

export default function Spinner({ color, size = 40, className }: SpinnerProps) {
  return (
    <div
      className={classnames(
        'sk-circle',
        className,
        `color-${color || 'white'}`
      )}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <div className="sk-circle1 sk-child" />
      <div className="sk-circle2 sk-child" />
      <div className="sk-circle3 sk-child" />
      <div className="sk-circle4 sk-child" />
      <div className="sk-circle5 sk-child" />
      <div className="sk-circle6 sk-child" />
      <div className="sk-circle7 sk-child" />
      <div className="sk-circle8 sk-child" />
      <div className="sk-circle9 sk-child" />
      <div className="sk-circle10 sk-child" />
      <div className="sk-circle11 sk-child" />
      <div className="sk-circle12 sk-child" />
    </div>
  );
}
