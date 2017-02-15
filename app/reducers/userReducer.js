import { SIGN_IN, SIGN_OUT } from '../actions/userActions';

// Fill out as much of the initial state as you can rather than just providing 
// an empty object. If you know the property names you'll have, include them. 
// This helps prevent errors like 'user.name is undefined' before you actually
// have an authenticated user, and lets you avoid writing conditionals in your 
// components to check for the values. (e.g. we can map through `user.favoriteMovies`
// right away if we've defined it as an empty array in the initial state
const initialState = {
  name: null,
  id: null,
  email: ''
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_IN":
      return Object.assign({}, state, action.user);
      break
    case "SIGN_OUT":
      return initialState;
      break
    default:
      return state;
      break
  }
};

export default userReducer;