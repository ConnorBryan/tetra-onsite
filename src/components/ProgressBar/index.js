import React from 'react';
import './styles.scss';

type ProgressBarProps = {
  width: number,
};
export default function ProgressBar({ width }: ProgressBarProps) {
  return (
    <div className="progressBarContainer">
      <div className="progressBar" style={{ width: `${width}%` }} />
    </div>
  );
}
