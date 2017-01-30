// import fetch from 'isomorphic-fetch';

export function addFavorite(movie) {
  console.log(2, movie)
  return {
    type: 'ADD_FAVORITE',
    data: movie
  }
}
export function recieveUserFavorites(movies) {
  console.log(2,movies)
  return {
    type: 'RECIEVE_MOVIES',
    data: movies
  }
}

export function updateMovies(data) {
  return {
    type: "UPDATE_MOVIES",
    data: data
  }
}

export function signInUser(user) {
  console.log('User', user)
  return {
    type: "SIGN_IN",
    user: user
  }
}

export function signOutUser(user) {
  console.log('User', user)
  return {
    type: "SIGN_OUT",
    user: ""
  }
}
