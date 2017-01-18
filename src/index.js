import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Form from './components/Form';
// import Page from './components/Page';
import Introduction from './components/Introduction';
import Description from './components/Description';
import Confirmation from './components/Confirmation';


import '../styles/bundle.css';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Introduction} />
    	<Route component={Description} path="description" />
    	<Route path="/build-bouquet" component={Form} />
    	<Route component={Confirmation} path="confirmation" />
    </Route>
  </Router>,
  document.getElementById('app')
);
