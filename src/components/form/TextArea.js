import React from 'react';
import type {
  TextInputProps,
  OnChangeProp,
} from 'src/components/form/TextInput';
import './TextArea.scss';

function makeEventHandler(name: string, onChange: OnChangeProp) {
  return e => onChange({ name, value: e.target.value });
}

type TextAreaProps = TextInputProps;

/**
 * A styled version of <textarea />
 */
export default function TextArea(props: TextAreaProps) {
  const { name } = props;
  return (
    <textarea
      {...props}
      className={
        props.className /* TODO(Abdul) why doesn't this spread properly?? */
      }
      onBlur={
        props.onBlur != null ? makeEventHandler(name, props.onBlur) : null
      }
      onChange={makeEventHandler(name, props.onChange)}
    />
  );
}
