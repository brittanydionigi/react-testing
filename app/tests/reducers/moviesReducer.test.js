import moviesReducer from '../../reducers/moviesReducer';

const initialState = [];

describe('movies reducer', () => {

  it('should return initial state by default', () => {
    expect(moviesReducer(undefined, {})).toEqual(initialState)
  });

  it('should return an array of movies when action is FETCH_MOVIES', () => {
    const movies = [1, 2, 3, 4, 5];

    expect(moviesReducer(undefined, {
      type: 'FETCH_MOVIES',
      movies
    })).toEqual(movies);
  });
});