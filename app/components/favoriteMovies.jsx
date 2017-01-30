import React, { Component } from 'react';
import { MovieCard } from './movieCard.jsx';

export const FavoriteMovies = (props) => {
  console.log(props.favorites)
  const favoriteMovies = props.favorites.map((movie) => <MovieCard key={movie.id} {...movie} />)
  return (
    <div>
      {favoriteMovies}
    </div>
  )
}
