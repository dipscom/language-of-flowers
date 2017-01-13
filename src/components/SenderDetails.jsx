import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SenderDetails extends Component {
  render() {
    return (
      <div id="details-form">
      <div>
        <h1>Your Details
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
      </svg>
        </h1>
        <label htmlFor="sender-name">Your first name</label>
        <input type="text" id="sender-name" className="sender" name="name" placeholder="Name" onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Your email</label>
        <input type="email" id="sender-email" className="sender" name="email" placeholder="Email" onChange={(e) => this.props.updateField(e)} />
      </div>
      <Link className="button" to="/confirmation">Confirm & Send</Link>
      </div>
    )
  }
}
