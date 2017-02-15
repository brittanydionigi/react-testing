export const REQUEST_IN_PROGRESS = 'REQUEST_IN_PROGRESS';
export const REQUEST_COMPLETE = 'REQUEST_COMPLETE';
export const MOVIES_RECEIVED = 'MOVIES_RECEIVED';

const FETCH_URL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=72dd63e7f1a8c927ce73ad8949399f40&language=en-US&page=1';

function moviesReceived(movies) {
  return {
    type: MOVIES_RECEIVED,
    movies
  }
};

function requestInProgress() {
  return {
    type: REQUEST_IN_PROGRESS,
  };
};

function requestComplete(status) {
  return {
    type: REQUEST_COMPLETE,
    status
  };
};

function fetchMovies() {
  return dispatch => {
    dispatch(requestInProgress());

    return fetch(FETCH_URL)
      .then(response => {

        // If the response comes back with an HTTP status that indicates an error
        if (response.status >= 400) {
          dispatch(requestComplete('error'));
          return response.json().then(err => { throw err; });
        }

        // Otherwise...
        dispatch(requestComplete('success'));
        return response.json().then(data => {
          dispatch(moviesReceived(data.results))
        });
      });
  };
};

export default {
  fetchMovies
};