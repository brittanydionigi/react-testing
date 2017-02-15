import { ADD_FAVORITE, DELETE_FAVORITE, FETCH_FAVORITES } from '../actions/favoriteActions';

const initialState = [];

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return state.concat([action.favorite]);
      break
    case DELETE_FAVORITE:
      return state.filter(movie => movie.id !== action.id)
      break
    case FETCH_FAVORITES:
      return [...state, ...action.favorite];
      break
    default:
      return state
      break
  }
};

export default favoritesReducer;