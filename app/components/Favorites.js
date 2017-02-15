import React, { Component } from 'react';

import { MovieCard } from './MovieCard';

export const Favorites = ({ favorites }) => {
  const favoriteMovies = favorites.map((movie) => <MovieCard key={movie.id} {...movie} />)
  let favoritesCount = favorites.length;

  if (favoritesCount.length) {
    return (<div id="favorites">{favoriteMovies}</div>);
  } else {
    return (<p>You haven't saved any favorites yet.</p>);
  }
}
