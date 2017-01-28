import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import movieIndex from './components/movieIndex.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={movieIndex} />
      <Route path='login' component={Login} />
    </Route>
  </Router>
  , document.getElementById('main'))
