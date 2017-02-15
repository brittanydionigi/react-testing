import favoritesReducer from '../../reducers/favoritesReducer';

const initialState = [];
const mockFavorites = [{ id: 1 }, { id: 2 }, { id: 3 }];

describe('user reducer', () => {

  it('should return initial state by default', () => {
    expect(favoritesReducer(undefined, {})).toEqual(initialState)
  });

  it('should add a favorite on ADD_FAVORITE', () => {
    expect(favoritesReducer(mockFavorites, {
      type: 'ADD_FAVORITE',
      favorite: { id: 4 }
    })).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
  });

  it('should return to the initialState when action is SIGN_OUT', () => {
    expect(favoritesReducer(mockFavorites, {
      type: 'DELETE_FAVORITE',
      id: 3
    })).toEqual([{ id: 1 }, { id: 2 }]);
  });
});