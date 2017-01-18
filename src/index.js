import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Form from './components/Form';
import Page from './components/Page';

import '../styles/bundle.css';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Page} />
    	<Route component={Page} path="page"></Route>
    	<Route path="/build-bouquet" component={Form} heading="Form One" />
    </Route>
  </Router>,
  document.getElementById('app')
);
