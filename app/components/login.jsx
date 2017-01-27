import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: '', password: ''};
  }
  handleSubmit(e) {
    e.preventDefault()
    let body = this.handleLowerCase();
    body.name = 'T$$$$$$$$'
    fetch(`api/users/new`, {method: "POST", headers: {
    'Content-Type': 'application/json' },
    body: JSON.stringify(body)}).then(function(response){
      response.json().then(function(response) {
        console.log(response) // depatch redux login
      })
    }).catch(function(error) {
      console.log(error)
    })
  }

  handleLowerCase() {
    var { email, password } = this.state;
    return {
      email: email.toLowerCase(),
      password: password.toLowerCase()
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        Email: <br/>
        <input type='text' name='email' onChange={this.handleChange.bind(this)}/><br/>
        Password: <br/>
        <input type='text' name='password' onChange={this.handleChange.bind(this)}/><br/>
        <input type='submit' value='Login'/><br/>
      </form>
    )
  }
}
