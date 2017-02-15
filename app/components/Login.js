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

    if (!this.validateEmail(this.state.email)) {
      this.setState({
        error: 'Invalid Email'
      });
    } else {
      // signIn({ email, password })
      //   .then(response => {
      //     console.log("YEP DONE HERE");
      //     browserHistory.push('/');
      //   }).catch((error) => {
      //     console.log("CAUGHT ERROR");
      //     this.setState({
      //       error: 'Invalid credentials'
      //     });
      //   }); 

      fetch('/api/users', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        if (response.status >= 400) {
          console.log("NOPE ERROR");
          this.setState({
            error: 'Invalid Credentials'
          });
        }
        else {
          console.log("YEP DONE");
          browserHistory.push('/');
        }
      });


    }
  }

  // fetchFavorites(id) {
  //   fetch(`api/users/${id}/favorites`)
  //   .then((response) => {
  //     response.json()
  //     .then((response) => {
  //       this.props.recieveUserFavorites(response.data);
  //       browserHistory.push('/');
  //     })
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  // handleLowerCase() {
  //   const { email, password } = this.state;
  //   return {
  //     email: email.toLowerCase(),
  //     password: password.toLowerCase()
  //   }
  // }

  validateEmail(email) {
    let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(email);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    console.log('rendering! ', this.state.error);
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
