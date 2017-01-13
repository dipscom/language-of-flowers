import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SenderDetails extends Component {
  render() {
    return (
      <div id="details-form">
      <div>
        <h1>Your Details<hr /></h1>
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