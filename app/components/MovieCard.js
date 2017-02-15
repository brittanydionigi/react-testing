import React from 'react';

export const MovieCard = ({id, title, poster_path, release_date, vote_average, overview, handleFavorite }) => {
  let movie = {movie_id: id, title, poster_path, release_date, vote_average, overview };
  return (
    <div id={id} className='movieCard' onClick={e => handleFavorite(movie)}>
      <h1>{title}</h1>
      <p>Overview: {overview} </p>
      <span>Release Date:{release_date} And Vote Average: {vote_average} </span>
      <img src={'https://image.tmdb.org/t/p/w500/' + poster_path} />
    </div>
  )
}
