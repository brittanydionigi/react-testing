import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Login from './components/login.jsx';
import MeatIndex from './components/meatIndex.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={Login}/>
      <Route path='login' component={Login} />
    </Route>
  </Router>
  , document.getElementById('main'))
