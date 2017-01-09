import React from 'react';
import { Router, Route, createMemoryHistory } from 'react-router';
import { render } from 'react-dom';
import App from './App';
import '../styles/bundle.css';

const history = createMemoryHistory(location);

render(
  <Router history={history}>
  	<Route path='/' component={App}></Route>
  </Router>,
  document.getElementById('root')
);