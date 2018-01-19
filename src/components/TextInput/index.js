import React from 'react';
import './styles.scss';

export type OnChangeProp = (value: { name: string, value: string }) => any;

export type TextInputProps = {
  className?: string,
  name: string,
  onBlur?: () => any,
  onChange: OnChangeProp,
  type?: string,
  placeholder?: string,
  value: string,
};

function makeEventHandler(name: string, onChange: OnChangeProp) {
  return e => onChange({ name, value: e.target.value });
}

export default function TextInput({
  className,
  name,
  onBlur,
  onChange,
  type = 'text',
  placeholder,
  value,
}: TextInputProps) {
  return (
    <input
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onBlur={onBlur != null ? makeEventHandler(name, onBlur) : null}
      onChange={makeEventHandler(name, onChange)}
    />
  );
}
