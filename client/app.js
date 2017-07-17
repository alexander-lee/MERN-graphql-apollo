import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import App from './scenes/App';

import client from './client-config';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
