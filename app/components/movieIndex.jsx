import React, { Component } from 'react';

let header = {method: 'cors'}

export default class MeatIndex extends Component {
  constructor() {
    super();
    this.state = {apiKey: '72dd63e7f1a8c927ce73ad8949399f40'}
  }

  componentDidMount(e) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`).then(function(response) {
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
    let meetups
    return (
      <div>
        Crazy
      {meetups}
      </div>
    )
  }
}
