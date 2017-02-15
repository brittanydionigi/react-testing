import React, { Component } from 'react';
import { Link } from 'react-router';

import { MovieCard } from './MovieCard';

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      notification: null
    };
  }

  // You want to make API requests in componentDidMount rather than componentWillMount
  // because if for some reason the component errs out before completing its mount, you'd
  // be making an unecessary server request and storing data that would never be displayed
  componentDidMount(e) {
    const { fetchMovies } = this.props;

    fetchMovies()
      .then(movies => {
        this.setState({
          notification: null
        });
      })
      .catch(error => {
        this.setState({
          notification: 'Error fetching movies.'
        });
      });
  }

  handleFavorite(movie) {
    const { user, addFavorite } = this.props;
    if (!user.id) {
      return this.setState({
        notification: 'You must be logged in to save a favorite.'
      });
    }

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
      addFavorite(Object.assign(movie, {id: response.id }))
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    const { user, movieDb, signOut } = this.props;
    const { notification } = this.state;
    let userOptions;

    if (user.id) {
      userOptions = <button className='signout' onClick={e => signOut()}>Sign Out</button>
    } else {
      userOptions = <Link className='login' to='/login'><button>Login</button></Link>;
    }

    let movieCards = movieDb.movies.map((movie) => {
      return <MovieCard key={movie.id} {...movie} handleFavorite={this.handleFavorite.bind(this)}/>
    });

    return (
      <div id="movieList">
        { notification && <p className="notification">{notification}</p> }
        { userOptions }
        { movieDb.isCurrentlyFetching && <p className="loading">Please wait while we fetch movies...</p> }
        { movieCards }
      </div>
    )
  }
}
