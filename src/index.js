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
import MyBouquet from './components/MyBouquet';
import Bouquet from './components/Bouquet';
import Flower from './components/Flower';

import '../styles/bundle.css';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute key="intro" component={Introduction} />
      <Route path="description" component={Description} />
      <Route component={Form}>
        <Route path="create-bouquet" components={{left:CreateBouquet, right:Flower}} />
        <Route path="view-bouquet" components={{left:Bouquet, right:ViewBouquet}} />
        <Route path="recipient" components={{left:Bouquet, right:RecipientDetails}} />
        <Route path="sender" components={{left:Bouquet, right:SenderDetails}} />
      </Route>
      <Route path="confirmation" component={Confirmation} />
      <Route path="success" component={Success} />
      <Route path="products" component={Products} />
      <Route path="my-bouquet" component={MyBouquet} />
    </Route>
  </Router>,
  document.getElementById('app')
);
