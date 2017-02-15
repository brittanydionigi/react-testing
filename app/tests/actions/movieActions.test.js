// mocks out a store for us & allows us to apply middleware like thunk
import configureMockStore from 'redux-mock-store';

// import thunk so we can incorporate it in our mocked out store
import thunk from 'redux-thunk';

// intercepts API requests made with fetch so we
// can control what kind of response we get back
import fetchMock from 'fetch-mock';

// import any/all of our user actions we want to test
import actions from '../../actions/movieActions';


// mock out a store and apply the thunk middleware
const mockStore = configureMockStore([thunk]);

// create a new store and set its initial state
// we only need the initial state to include the
// data that would be effected by our tests
const store = mockStore({ 
  movies: [],
  isCurrentlyFetching: false
});

// mock out some pretend user data to work with
// we'll use this as our pretend response from 
// our API call
const mockMovies = [1, 2, 3, 4, 5];

const mockFetchUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=72dd63e7f1a8c927ce73ad8949399f40&language=en-US&page=1';

describe('movieActions', () => {

  afterEach(() => {

    // assert that all API calls have been intercepted
    // and handled appropriately. If there is anything
    // remaining in this array, we done messed up
    expect(fetchMock.calls().unmatched).toEqual([]);

    // our mocked-out store keeps a log of all the actions
    // that have been dispatched so we can check that the
    // appropriate ones are being called. after each test
    // we want to clear this out so we can start fresh
    store.clearActions();

    // start fresh with fetchMock after each test so that we're
    // not intercepting API calls that no longer need to be tested
    fetchMock.restore();
  });


  it('creates 3 consecutive actions when fetching moves is successful', () => {

    // mock out what kind of action data we expect to be dispatched
    let expectedActions = [
      { type: 'REQUEST_IN_PROGRESS' },
      { type: 'REQUEST_COMPLETE', status: 'success' },
      { type: 'MOVIES_RECEIVED', movies: mockMovies }
    ];

    // intercept our POST request to /api/users, and automatically
    // return a successful status of 201 with our mockUser data
    fetchMock.get(mockFetchUrl, { status: 200, body: { results: mockMovies } });

    // dispatch our logIn function with a made up email/password
    // because it doesn't matter - the request won't fail because
    // we are intercepting it with fetchMock and telling it to
    // return successfully regardless 
    return store.dispatch(actions.fetchMovies())
      .then(() => {

        // get any actions that were created as a result of this dispatch
        // remember our configureMockStore provides this as a utility
        // for us for free, because this is something we would want to test
        let createdActions = store.getActions();

        // ensure that only 1 action was dispatched. It's important to
        // test the length to ensure that no 'side effects' occurred as
        // a result of us logging in
        expect(createdActions.length).toEqual(3);

        // expect the first action created to equal the one we stubbed out
        // earlier -> { type: 'SIGN_IN', user: mockUser.data }
        expect(createdActions).toEqual(expectedActions);
      });
  });

  it('creates a REQUEST_IN_PROGRESS and REQUEST_COMPLETE action when fetching movies fails', () => {
    
    // mock out what kind of action data we expect to be dispatched
    let expectedActions = [
      { type: 'REQUEST_IN_PROGRESS' },
      { type: 'REQUEST_COMPLETE', status: 'error' }
    ];

    fetchMock.get(mockFetchUrl, { status: 500, body: {} });

    return store.dispatch(actions.fetchMovies())
      .catch(() => {
        let createdActions = store.getActions();
        expect(createdActions.length).toEqual(2);
        expect(createdActions).toEqual(expectedActions);
      });
  })
})