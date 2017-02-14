// The highest-level App component can just be a dumb component. There's
// no need for it to be a container because we're not doing any data
// fetching or calling any redux actions from here, it's just a DOM
// wrapper that receives child props and does not maintain its own state
import React, { PropTypes as pt } from 'react';

export const App = ({ children }) =>  {
  return (
    <div>
      <h1>Movie Watcher</h1>
      {children}
    </div>
  )
};

App.propTypes = {
  children: pt.object.isRequired
};