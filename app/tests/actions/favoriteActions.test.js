import configureMockStore from 'redux-mock-store';
import actions from '../../actions/favoriteActions';

// Mock out a store -- this needs double ()'s because configureMockStore
// returns a function that allows you to configure it before initializing it.
// We don't need to do any configuration in this case, so we're just going to
// initialize it right away.
const store = configureMockStore()();

const mockFave = {
  id: 1,
  title: 'Scar Face'
};

describe('favoriteActions', () => {

  afterEach(() => {
    store.clearActions();
  });

  it('creates ADD_FAVORITE when adding a fave', () => {
    let expectedAction = { type: 'ADD_FAVORITE', favorite: mockFave };

    store.dispatch(actions.addFavorite(mockFave));

    let createdActions = store.getActions();
    expect(createdActions.length).toEqual(1);
    expect(createdActions[0]).toEqual(expectedAction);
  });

  it('creates DELETE_FAVORITE when deleting a fave', () => {
    let expectedAction = { type: 'DELETE_FAVORITE', id: 1 };

    store.dispatch(actions.deleteFavorite(1));

    let createdActions = store.getActions();
    expect(createdActions.length).toEqual(1);
    expect(createdActions[0]).toEqual(expectedAction);
  })
});

