import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './userReducer';
import favoritesReducer from './favoritesReducer';
import moviesReducer from './moviesReducer';

export default combineReducers({
  user: userReducer,
  favorites: favoritesReducer,
  movieDb: moviesReducer,
  routing: routerReducer,
});