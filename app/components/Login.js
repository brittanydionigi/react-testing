import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { 
      email: '',
      password: '',
      error: ''
    };
  }

  handleLogin(e) {
    const { signIn } = this.props;
    const { email, password } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({
        error: 'Invalid Email'
      });
    } else {
      fetch('/api/users', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        if (response.status >= 400) {
          this.setState({
            error: 'Invalid Credentials'
          });
        }
        else {
          browserHistory.push('/');
          response.json().then(user => signIn(user.data));
        }
      })
      .catch(error => {
        signInFailed(error);
      });
    }
  }

  validateEmail(email) {
    let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    const { email, password, error } = this.state;
    const { user } = this.props;

    return (
      <div>
        { error && <p className='errorMessage'>{error}</p>}
        Email: <br/>
        <input type='text' value={email || user.email} name='email' onChange={this.handleChange.bind(this)}/><br/>
        Password: <br/>
        <input type='text' value={password} name='password' onChange={this.handleChange.bind(this)}/><br/>
        <button onClick={this.handleLogin.bind(this)}>Login</button>
      </div>
    )
  }
}
