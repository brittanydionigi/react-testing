import React, { Component } from 'react';

let header = {method: 'cors'}

export default class MeatIndex extends Component {
  constructor() {
    super();
  }

  componentDidMount(e) {
    // navigator.geolocation.getCurrentPosition(p => {
      fetch(`http://api.icndb.com/jokes/random`).then(function(response) {
        response.json()
        .then(function(response) {
          console.log(response)
        })
      })
    // })
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
