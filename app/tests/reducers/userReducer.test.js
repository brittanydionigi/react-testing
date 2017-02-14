import userReducer from '../../reducers/userReducer';

const initialState = {
  id: null,
  name: null,
  email: null
};

describe('user reducer', () => {

  it('should return initial state by default', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  });

  it('should return a user object when action is SIGN_IN', () => {
    const user = { id: 1, name: 'Bob Loblaw', email: 'foo' };

    expect(userReducer(undefined, {
      type: 'SIGN_IN',
      user
    })).toEqual(user);
  });
});