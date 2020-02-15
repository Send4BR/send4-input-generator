import React, { Component } from 'react'

import Send4InputGenerator from 'send4-input-generator'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      email: '',
      cpf: '',
      name: '',
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
    if (strCpf === "00000000000") return false;

    var soma = 0;

    for (var i = 1; i <= 9; i++) {
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

    for (var i = 1; i <= 10; i++) {
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
      <div className="form">
        <Send4InputGenerator
          id="number"
          label="Number"
          lang="ptBR"
          defaultValue={this.state.number}
          validation={this.onlyNumber}
          message="Não é um número"
          isRequired={false}
          onChange={(number) => this.setState({ number })}
        />
        <Send4InputGenerator
          id="email"
          label="Email"
          lang="enUS"
          placeholder="example@mail.com"
          defaultValue={this.state.email}
          validation={this.emailValidator}
          message="Email invalid"
          isRequired={true}
          onChange={(email) => this.setState({ email })}
        />
        <Send4InputGenerator
          id="cpf"
          label="CPF"
          lang="ptBR"
          defaultValue={this.state.cpf}
          validation={this.cpfValidator}
          message="CPF inválido!"
          maxLength={11}
          isRequired={true}
          onChange={(cpf) => this.setState({ cpf })}
        />
        <Send4InputGenerator
          id="name"
          label="Name"
          lang="esES"
          defaultValue={this.state.name}
          minLength={4}
          isRequired={true}
          onChange={(text) => this.setState({ name: text })}
        />
      </div>
    )
  }
}
