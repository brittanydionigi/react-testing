// exporting these strings as variables seems redundant, but it helps
// avoid bugs related to simple typos & makes it easier to update an
// action name in a single spot rather than all over your application
export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

function signOut() {
  return {
    type: SIGN_OUT
  }
};

function signIn(user) {
  // returns a fn
  return dispatch => {
    // that returns a Promise
    return fetch('/api/users', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(user => {
      // which dispatches SIGN_IN when it resolves
      dispatch({
        type: SIGN_IN,
        user: {
          name: user.data.name,
          id: user.data.id,
          email: user.data.email
        }
      });
    })
    .catch(error => {
      // or dispatches SIGN_IN_ERROR when it fails
      dispatch({
        type: SIGN_IN_ERROR
      });
    })
  }
}

export default {
  signIn,
  signOut
}