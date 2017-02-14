// exporting these strings as variables seems redundant, but it helps
// avoid bugs related to simple typos & makes it easier to update an
// action name in a single spot rather than all over your application
export const FETCH_MOVIES = 'FETCH_MOVIES';


export function fetchMovies(movies) {
  return {
    type: FETCH_MOVIES,
    movies: movies
  }
};

export default {
  fetchMovies
}