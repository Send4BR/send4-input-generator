import React, { useState } from 'react';
import { string, number, func, oneOfType, bool } from 'prop-types';

import locales from './locales';

const container = {
  position: 'relative',
  display: 'grid',
  height: '80px',
  margin: '5px'
};

const paragraph = {
  margin: '0',
  paddingTop: '5px',
  height: '20px'
};

const counter = {
  position: 'absolute',
  right: '5px',
  bottom: '30px'
};

export default function Input(props) {
  const [error, setError] = useState(null);
  const [focus, setFocus] = useState(false);

  const onBlur = () => setFocus(false);

  const onFocus = () => setFocus(true);

  const handleChange = (event) => {
    const field = event.target;
    const { validation, errorMsg, lang, minLength } = props;
    // restore error initial state;
    setError(null);
    field.hasError = false;

    if (!field.validity.valid) {
      if (field.validity.tooShort) setError(locales(lang).TOOSHORT.replace('%d', minLength));
      if (field.validity.patternMismatch) setError(errorMsg || 'Error');
      if (!field.value) setError(locales(lang).REQUIRED);
    };

    if (validation && typeof validation === 'function') {
      if (field.value && !validation(field.value)) {
        field.hasError = true;
        setError(errorMsg || 'Error');
      }
    };

    props.onChange(field.value);
  }

  return (
    <div
      className={error ? 'input-default error' : 'input-default'}
      style={container}
    >
      <label>{props.label}</label>
      <input
        id={props.id}
        name={props.id}
        autoFocus={props.autoFocus || false}
        placeholder={props.placeholder || null}
        value={props.value}
        type={props.type || 'text'}
        required={props.required}
        maxLength={props.maxLength}
        minLength={props.minLength || null}
        pattern={props.pattern}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={{ width: 'inherit' }}
      />
      <p style={paragraph}>{error}</p>
      {(focus && props.maxLength) &&
        <small style={counter}>
          {(props.value ? props.value.length : 0) + '/' + props.maxLength}
        </small>
      }
    </div>
  )
}

Input.propTypes = {
  id: oneOfType([string, number]),
  label: string,
  type: string,
  lang: string,
  autoFocus: bool,
  placeholder: string,
  value: string,
  required: bool,
  errorMsg: string,
  maxLength: number,
  minLength: number,
  pattern: string,
  validation: func,
  onChange: func.isRequired
};

Input.defaultProps = {
  hasError: () => { },
  onChange: () => { },
  inputLang: 'enUS'
};
