// mocks out a store for us & allows us to apply middleware like thunk
import configureMockStore from 'redux-mock-store';

// import any/all of our user actions we want to test
import actions from '../../actions/userActions';


// mock out a store
const mockStore = configureMockStore();

// create a new store and set its initial state
// we only need the initial state to include the
// data that would be effected by our tests
const store = mockStore();

// mock out some pretend user data to work with
// we'll use this as our pretend response from 
// our API call
const mockUser = {
  data: {
    name: 'Bob Loblaw',
    id: 1,
    email: 'foo@bar.com'
  }
};

describe('userActions', () => {

  afterEach(() => {

    // our mocked-out store keeps a log of all the actions
    // that have been dispatched so we can check that the
    // appropriate ones are being called. after each test
    // we want to clear this out so we can start fresh
    store.clearActions();
  });

  it('creates SIGN_IN when initiating the signIn action', () => {

    // mock out what kind of action data we expect to be dispatched
    let expectedAction = { type: 'SIGN_IN', user: mockUser.data };

    // dispatch our signIn function with a made up email/password
    // because it doesn't matter - the request won't fail because
    // we are intercepting it with fetchMock and telling it to
    // return successfully regardless 
    store.dispatch(actions.signIn(mockUser.data));

    // get any actions that were created as a result of this dispatch
    // remember our configureMockStore provides this as a utility
    // for us for free, because this is something we would want to test
    let createdActions = store.getActions();

    // ensure that only 1 action was dispatched. It's important to
    // test the length to ensure that no 'side effects' occurred as
    // a result of us logging in
    expect(createdActions.length).toEqual(1);

    // expect the first action created to equal the one we stubbed out
    // earlier -> { type: 'SIGN_IN', user: mockUser.data }
    expect(createdActions[0]).toEqual(expectedAction);
  });

  it('creates SIGN_IN_ERROR when sign in fails', () => {
    let expectedAction = { type: 'SIGN_IN_ERROR', error: 'Invalid Credentials' };
    store.dispatch(actions.signInFailed('Invalid Credentials'));

    let createdActions = store.getActions();
    expect(createdActions.length).toEqual(1);
    expect(createdActions[0]).toEqual(expectedAction);
  })
});

