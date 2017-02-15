import moviesReducer from '../../reducers/moviesReducer';

const initialState = {
  movies: [],
  isCurrentlyFetching: false
};

describe('movies reducer', () => {

  it('should return initial state by default', () => {
    expect(moviesReducer(undefined, {})).toEqual(initialState)
  });

  it('should update isCurrentlyFetching when a request is in progress (REQUEST_IN_PROGRESS)', () => {
    expect(moviesReducer(undefined, {
      type: 'REQUEST_IN_PROGRESS',
    })).toEqual({
      movies: [],
      isCurrentlyFetching: true
    });
  });

  it('should update isCurrentlyFetching whe a request is complete (REQUEST_COMPLETE)', () => {
    expect(moviesReducer(undefined, {
      type: 'REQUEST_COMPLETE',
    })).toEqual({
      movies: [],
      isCurrentlyFetching: false
    });
  });

  it('should return an array of movies when action is FETCH_MOVIES', () => {
    const mockMovies = [1, 2, 3, 4, 5];

    expect(moviesReducer(undefined, {
      type: 'MOVIES_RECEIVED',
      movies: mockMovies
    })).toEqual({
      movies: mockMovies,
      isCurrentlyFetching: false
    });
  });

});