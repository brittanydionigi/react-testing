import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// favorites
  // add, remove
// user
  // add, find/signIn
// data

function userReducer (state = {}, action) {
  switch (action.type) {
    case "SIGN_IN":
      return Object.assign({}, state, action.user)
      break
    case "SIGN_OUT":
      return Object.assign({}, state, action.user)
      break
    default:
      return state
      break
  }
}
// reducers takes in two things:
  // takes in the action and copy of current state
function movieApiReducer (state = [], action) {
  if (action.type === "UPDATE_MOVIES") {
    return action.data
  }
  return state;
}

function favoriteReducer (state = [], action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.data];
      break
    case "RECIEVE_MOVIES":
      return [...state, ...action.data];
      break
    default:
      return state
      break
  }
}

export const indexReducer =
        combineReducers({ favoriteReducer, movieApiReducer, userReducer,
                        routing: routerReducer })
