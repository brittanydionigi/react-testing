import { MOVIES_RECEIVED, REQUEST_IN_PROGRESS, REQUEST_COMPLETE } from '../actions/movieActions';

const initialState = {
  movies: [],
  isCurrentlyFetching: false
};

function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IN_PROGRESS:
      return Object.assign({}, state, {
        isCurrentlyFetching: true
      });
      break
    case REQUEST_COMPLETE:
      return Object.assign({}, state, {
        isCurrentlyFetching: false
      });
      break
    case MOVIES_RECEIVED:
      return Object.assign({}, state, {
        movies: action.movies
      });
      break
    default:
      return state;
      break
  }
};

export default moviesReducer;