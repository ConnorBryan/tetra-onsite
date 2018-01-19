import React from 'react';
import './styles.scss';

type PaginationFabProps = {
  selected?: boolean,
  onClick?: () => void,
  text: string,
};

export default function PaginationFab({
  selected = false,
  onClick,
  text,
}: PaginationFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={selected ? 'selected' : null}
    >
      {text}
    </button>
  );
}
