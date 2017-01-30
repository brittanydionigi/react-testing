import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: 'tman2272@aol.com', password: 'password'};
  }

  handleSubmit(e) {
    e.preventDefault()
    const body = this.handleLowerCase();
    fetch(`api/users`, { method: "POST", headers: {
    'Content-Type': 'application/json' },
    body: JSON.stringify(body)})
    .then((response) => {
      response.json()
      .then((response) => {
        console.log('success')
        this.props.signInUser(response.data);
        this.fetchFavorites(response.data.id);
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  fetchFavorites(id) {
    fetch(`api/users/${id}/favorites`)
    .then((response) => {
      response.json()
      .then((response) => {
        this.props.recieveUserFavorites(response.data);
        browserHistory.push('/');
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  handleLowerCase() {
    const { email, password } = this.state;
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
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        Email: <br/>
        <input type='text' value={email} name='email' onChange={this.handleChange.bind(this)}/><br/>
        Password: <br/>
        <input type='text' value={password} name='password' onChange={this.handleChange.bind(this)}/><br/>
        <input type='submit' value='Login'/><br/>
      </form>
    )
  }
}
