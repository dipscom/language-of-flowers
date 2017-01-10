import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SenderDetails extends Component {
  render() {
    return (
      <div>
      <div>
        <h1>Your Details</h1>
        <label htmlFor="sender-name">Your first name</label>
        <input type="text" id="sender-name" className="sender" name="name" onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Your email</label>
        <input type="email" id="sender-email" className="sender" name="email" onChange={(e) => this.props.updateField(e)} />
      </div>
      <Link to="/confirmation">Confirm & Send</Link>
      </div>
    )
  }
}