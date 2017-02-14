import React, { Component } from 'react';
import { Link } from 'react-router';

import { MovieCard } from './MovieCard';

export default class MovieList extends Component {
  constructor() {
    super();
  }

  // You want to make API requests in componentDidMount rather than componentWillMount
  // because if for some reason the component errs out before completing its mount, you'd
  // be making an unecessary server request and storing data that would never be displayed
  componentDidMount(e) {
    const { fetchMovies } = this.props;

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=72dd63e7f1a8c927ce73ad8949399f40&language=en-US&page=1`)
    .then(response => response.json())
    .then(response => fetchMovies(response.results))
    .catch(error => console.log('Error: ', error))
  }

  handleFavorite(movie) {
    const { user } = this.props;
    if (!user.id) return alert("Sign In please to like something");

    movie.user_id = user.id;

    fetch(`api/users/favorites/new`, { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then(response => response.json())
    .then(response => {
      console.log('success', response)
      this.props.addFavorite(Object.assign(movie, {id: response.id }))
    }).catch((error) => {
      console.log(error)
    })
  }

  handleSignOut(e) {
    e.preventDefault()
    this.props.signOutUser();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  render() {
    const { user, movies } = this.props;

    let userLink = <Link to='/login'><button> Login </button></Link>
    let favoriteLink;
    if (user.id) {
      userLink = <button onClick={this.handleSignOut.bind(this)}>Sign Out</button>
      favoriteLink = <Link to='/favorites'><button> / Favorites </button></Link>
    }
    let moviesList = movies.map((movie) => {
      return <MovieCard key={movie.id} {...movie} handleFavorite={this.handleFavorite.bind(this)}/>
    });
    return (
      <div>
      {userLink} {favoriteLink}<br/>
      {moviesList}
      </div>
    )
  }
}
