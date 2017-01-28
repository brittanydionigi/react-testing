import React, { Component } from 'react';

let header = {method: 'cors'}

export default class MeatIndex extends Component {
  constructor() {
    super();
    this.state = {api_key: ''}
  }

  componentDidMount(e) {
    fetch(`https://api.themoviedb.org/3/movie/76341?api_key=${this.state.api_key}`).then(function(response) {
      response.json()
      .then(function(response) {
        console.log(response)
      })
    })
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    let meetups;
    return (
      <div>
        Crazy
      {meetups}
      </div>
    )
  }
}
