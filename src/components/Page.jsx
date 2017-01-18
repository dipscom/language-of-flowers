import React, { Component } from 'react';
import Background from './Background';
import Anchor from './Anchor';

export default class Page extends Component {
  render() { 
    return (
      <div className="page">
      	<h1>Page</h1>
      	<Background />
      	<Anchor name="Form" target="form" />
      </div> 
    )
  }
}