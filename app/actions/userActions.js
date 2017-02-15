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
  return {
    type: SIGN_IN,
    user
  }
};

function signInFailed(error) {
  return {
    type: SIGN_IN_ERROR,
    error
  }
};

export default {
  signIn,
  signOut,
  signInFailed
}