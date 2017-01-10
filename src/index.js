import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import CreateBouquet from './components/CreateBouquet';
import Description from './components/Description';
import Form from './components/Form';
import Introduction from './components/Introduction';
import ViewBouquet from './components/ViewBouquet';
import RecipientDetails from './components/RecipientDetails';
import SenderDetails from './components/SenderDetails';
import Confirmation from './components/Confirmation';
import Success from './components/Success';
import Products from './components/Products';

import '../styles/bundle.css';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Introduction} />
      <Route path="description" component={Description} />
      <Route component={Form}>
        <Route path="create-bouquet" component={CreateBouquet} />
        <Route path="view-bouquet" component={ViewBouquet} />
        <Route path="recipient" component={RecipientDetails} />
        <Route path="sender" component={SenderDetails} />
      </Route>
      <Route path="confirmation" component={Confirmation} />
      <Route path="success" component={Success} />
      <Route path="products" component={Products} />
    </Route>
  </Router>,
  document.getElementById('root')
);