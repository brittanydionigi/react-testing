// exporting these strings as variables seems redundant, but it helps
// avoid bugs related to simple typos & makes it easier to update an
// action name in a single spot rather than all over your application
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';


function addFavorite(movie) {
  return {
    type: ADD_FAVORITE,
    favorite: movie
  }
};

function deleteFavorite(movie) {
  return {
    type: DELETE_FAVORITE,
    favorite: movie
  }
};

function fetchFavorites(movies) {
  return {
    type: FETCH_FAVORITES,
    favorites: movies
  }
}

export default {
  addFavorite,
  deleteFavorite,
  fetchFavorites
}