import React, { Component } from 'react';
import { string, number, func, oneOfType, bool } from 'prop-types';

import locales from './locales';
import styles from './styles.css';

export default class Send4InputGenerator extends Component {
  static propTypes = {
    id: oneOfType([string, number]),
    label: string,
    type: string,
    lang: string,
    placeholder: string,
    defaultValue: string,
    isRequired: bool,
    message: string,
    maxLength: number,
    minLength: number,
    validation: func,
    onChange: func.isRequired,
    hasError: func.isRequired
  }

  static defaultProps = {
    hasError: () => { },
    onChange: () => { },
    lang: 'enUS'
  }

  constructor(props) {
    super(props);

    this.state = { error: null };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { validation, message, isRequired, minLength, lang } = this.props;
    // restore error initial state;
    let error = null;

    if (isRequired && !event.target.value) {
      error = locales(lang).REQUIRED;
    }

    if (minLength && event.target.value && event.target.value.length < minLength) {
      error = locales(lang).MINLENGTH.replace('%d', minLength);
    }

    if (validation && typeof validation === 'function') {
      if (event.target.value && !validation(event.target.value)) {
        error = message || 'Error';
      }
    };

    this.setState({ error });

    this.props.hasError(!!this.state.error || false);
    this.props.onChange(event.target.value);
  }

  render() {
    const {
      id,
      label,
      type,
      placeholder,
      defaultValue,
      isRequired,
      maxLength,
      minLength
    } = this.props;

    return (
      <div className={styles.container} id={`field-${id}`}>
        <label className={this.state.error && styles.labelError}>{label}</label>
        <input
          id={id}
          className={this.state.error && styles.inputError}
          placeholder={placeholder || null}
          value={defaultValue}
          type={type || 'text'}
          required={isRequired}
          maxLength={maxLength}
          minLength={minLength || null}
          onChange={this.handleInputChange}
        />
        <p className={this.state.error && styles.paragraphError}>{this.state.error}</p>
      </div>
    )
  }
}
