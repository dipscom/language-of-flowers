import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './App';
import SelectFlowers from './components/SelectFlowers';
import Description from './components/Description';
import Form from './components/Form';
import Introduction from './components/Introduction';
import BouquetDetails from './components/BouquetDetails';
import RecipientDetails from './components/RecipientDetails';
import SenderDetails from './components/SenderDetails';
import Confirmation from './components/Confirmation';
import Success from './components/Success';
import MyBouquet from './components/MyBouquet';
import Bouquet from './components/Bouquet';
import Flower from './components/Flower';
import ShareBouquet from './components/ShareBouquet';

import '../styles/bundle.css';

// function checkState(nextState, replace){
//   console.log(nextState);
//   switch(nextState.location.pathname)

// }

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute key="intro" component={Introduction} />
      <Route path="description" component={Description} />
      <Route path="bouquet" component={Form}>
        <Route path="create" components={{left:SelectFlowers, right:Flower}} />
        <Route path="view" components={{left:Bouquet, right:BouquetDetails}} />
        <Route path="recipient" components={{left:Bouquet, right:RecipientDetails}} />
        <Route path="sender" components={{left:Bouquet, right:SenderDetails}} />
      </Route>
      <Route path="confirmation" component={Confirmation} />
      <Route path="success" component={Success} />
      <Route path="my-bouquet" components={{first:MyBouquet, second:BouquetDetails, third:ShareBouquet}} />
    </Route>
  </Router>,
  document.getElementById('app')
);
