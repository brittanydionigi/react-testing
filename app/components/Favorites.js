import React, { Component } from 'react';

import { MovieCard } from './MovieCard';

export const Favorites = ({ favorites }) => {
  const favoriteMovies = favorites.map((movie) => <MovieCard key={movie.id} {...movie} />)
  return (<div id="favorites">{favoriteMovies}</div>);
}
