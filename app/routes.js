// common convention to place any 3rd-party/vendor imports first, take a line break,
// then import any custom modules you've written (e.g. components). Makes it easier
// to find things and recognize what's yours and what's been npm installed

import React from 'react';
import { IndexRedirect, IndexRoute, Route } from 'react-router';

import { App } from './components/App';
import MoviesContainer from './containers/MoviesContainer';
import LoginContainer from './containers/LoginContainer';
import FavoritesContainer from './containers/FavoritesContainer';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={MoviesContainer} />
    <Route path='login' component={LoginContainer} />
    <Route path='favorites' component={FavoritesContainer} />
  </Route>
);