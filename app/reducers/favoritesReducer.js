import { ADD_FAVORITE, DELETE_FAVORITE, FETCH_FAVORITES } from '../actions/favoriteActions';

const initialState = [];

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.data];
      break
    case DELETE_FAVORITE:
      return [...state, action.data];
      break
    case FETCH_FAVORITES:
      return [...state, ...action.data];
      break
    default:
      return state
      break
  }
};

export default favoritesReducer;