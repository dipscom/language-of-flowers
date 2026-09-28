import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./components/App";
import Form from "./components/Form";
import Introduction from "./components/Introduction";
import Description from "./components/Description";
import Confirmation from "./components/Confirmation";
import Success from "./components/Success";
import MyBouquet from "./components/MyBouquet";

import "../styles/index.css";

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Introduction} />
      <Route component={Description} path="description" />
      <Route component={Form} path="buildbouquet" />
      <Route component={Confirmation} path="confirmation" />
      <Route component={Success} path="success" />
      <Route component={MyBouquet} path="mybouquet" />
      <Route component={Form} path="viewbouquet" />
    </Route>
  </Router>,
  document.getElementById("app"),
);
