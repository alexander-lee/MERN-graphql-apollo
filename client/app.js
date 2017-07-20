import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import App from './scenes/App';
import PostList from './scenes/PostList';
import PostInformation from './scenes/PostInformation';

import client from './client-config';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PostList} />
        <Route path="post/:id" component={PostInformation} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
