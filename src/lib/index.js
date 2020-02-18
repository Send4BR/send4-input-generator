import React, { Component } from 'react';
import { string, number, func, oneOfType, bool } from 'prop-types';

import locales from './locales';
import styles from './styles.css';

export default class Input extends Component {
  static propTypes = {
    inputId: oneOfType([string, number]),
    inputLabel: string,
    inputType: string,
    inputLang: string,
    inputAutoFocus: bool,
    inputPlaceholder: string,
    inputValue: string,
    inputRequired: bool,
    inputErrorMsg: string,
    inputMaxLength: number,
    inputMinLength: number,
    validation: func,
    onChange: func.isRequired,
    hasError: func.isRequired
  }

  static defaultProps = {
    hasError: () => { },
    onChange: () => { },
    inputLang: 'enUS'
  }

  constructor(props) {
    super(props);

    this.state = { error: null, focus: false };

    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onBlur() {
    this.setState({ focus: false });
  };

  onFocus() {
    this.setState({ focus: true });
  };

  handleChange(event) {
    const { validation, inputErrorMsg, inputRequired, inputMinLength, inputLang } = this.props;
    // restore error initial state;
    let error = null;

    if (inputRequired && !event.target.value) {
      error = locales(inputLang).REQUIRED;
    }

    if (inputMinLength && event.target.value && event.target.value.length < inputMinLength) {
      error = locales(inputLang).MINLENGTH.replace('%d', inputMinLength);
    }

    if (validation && typeof validation === 'function') {
      if (event.target.value && !validation(event.target.value)) {
        error = inputErrorMsg || 'Error';
      }
    };

    this.setState({ error });

    this.props.hasError(!!this.state.error || false);
    this.props.onChange(event.target.value);
  }

  render() {
    const {
      inputId,
      inputLabel,
      inputType,
      inputAutoFocus,
      inputPlaceholder,
      inputValue,
      inputRequired,
      inputMaxLength,
      inputMinLength
    } = this.props;

    return (
      <div className={styles.container} id={`field-${inputId}`}>
        <label className={this.state.error && styles.labelError}>{inputLabel}</label>
        <input
          id={inputId}
          autoFocus={inputAutoFocus || false}
          className={this.state.error && styles.inputError}
          placeholder={inputPlaceholder || null}
          value={inputValue}
          type={inputType || 'text'}
          required={inputRequired}
          maxLength={inputMaxLength}
          minLength={inputMinLength || null}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <p className={this.state.error && styles.paragraphError}>{this.state.error}</p>
        {(this.state.focus && inputMaxLength) &&
          <small className={styles.counter}>
            {(inputValue ? inputValue.length : 0) + '/' + inputMaxLength}
          </small>
        }
      </div>
    )
  }
}
