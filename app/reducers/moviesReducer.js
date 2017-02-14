import { FETCH_MOVIES } from '../actions/movieActions';

const initialState = [];

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES:
      return action.movies;
      break
    default:
      return state;
      break
  }
};

export default moviesReducer;