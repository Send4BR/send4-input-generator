import React, { Component } from 'react'

import Input from 'send4-input-generator'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      email: '',
      cpf: '',
      name: ''
    };

    this.emailValidator = this.emailValidator.bind(this);
    this.onlyNumber = this.onlyNumber.bind(this);
    this.cpfValidator = this.cpfValidator.bind(this);
  }

  emailValidator(email) {
    if (typeof email === 'string' && email.length > 0) {
      const re = /^([a-z0-9_\-.+])+@([a-z0-9_\-.])+\.([a-z]{2,})$/i;
      return re.test(String(email).toLowerCase());
    }
  };

  onlyNumber(n) {
    return !isNaN(n);
  };

  cpfValidator(strCpf) {
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === '00000000000') return false;

    let soma = 0;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    var resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(9, 10))) {
      return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
      soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className='form'>
        <Input
          inputId='number'
          inputLabel='Number'
          inputLang='ptBR'
          inputValue={this.state.number}
          validation={this.onlyNumber}
          inputErrorMsg='Não é um número'
          inputRequired={false}
          onChange={(number) => this.setState({ number })}
        />
        <Input
          inputId='email'
          inputLabel='Email'
          inputLang='enUS'
          inputPlaceholder='example@mail.com'
          inputValue={this.state.email}
          validation={this.emailValidator}
          inputErrorMsg='Email invalid'
          inputRequired={true}
          onChange={(email) => this.setState({ email })}
        />
        <Input
          inputId='cpf'
          inputLabel='CPF'
          inputLang='ptBR'
          inputValue={this.state.cpf}
          validation={this.cpfValidator}
          inputErrorMsg='CPF inválido!'
          inputMaxLength={11}
          inputRequired={true}
          onChange={(cpf) => this.setState({ cpf })}
        />
        <Input
          inputId='name'
          inputLabel='Name'
          inputLang='esES'
          inputValue={this.state.name}
          inputMinLength={4}
          inputMaxLength={20}
          inputRequired={true}
          onChange={(text) => this.setState({ name: text })}
        />
      </div>
    )
  }
}
