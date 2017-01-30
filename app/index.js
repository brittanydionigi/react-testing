import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContainerApp from './containers/containerApp.js';
import ContainerLogin from './containers/containerlogin.js';
import ContainerMovieIndex from './containers/containerMovieIndex.js';
import FavoriteContainer from './containers/favoriteContainer.js';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { indexReducer } from './reducers/index.js';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

const store = createStore(indexReducer, {},  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const history = syncHistoryWithStore(browserHistory, store);

const router = (
  <Provider store={store}>
    <Router history={history} >
      <Route path='/' component={ContainerApp}>
        <IndexRoute component={ContainerMovieIndex} />
        <Route path='login' component={ContainerLogin} />
        <Route path='signout' component={ContainerLogin} />
        <Route path='favorites' component={FavoriteContainer} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
router, document.getElementById('main'))
