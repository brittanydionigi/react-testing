import React, { Component } from 'react';

import { MovieCard } from './MovieCard';

export const Favorites = (props) => {
  const favoriteMovies = props.favorites.map((movie) => <MovieCard key={movie.id} {...movie} />)
  return (
    <div>
      {favoriteMovies}
    </div>
  )
}
