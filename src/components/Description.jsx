import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Description extends Component {
  render() {
    return (
      <div id="description" className="stage">
          <img src="" alt="The Language of Flowers" title="The Language of Flowers" />
          <h1>Bouquets full of hidden meaning.</h1>
          <p>Whilst we don't like to gossip...</p>
          <strong>Choose the flowers and the recipient wisely</strong>
          <IndexLink to="/">Back</IndexLink>
          <Link to="/create-bouquet">Create your own bouquet</Link>
      </div>
    )
  }
}