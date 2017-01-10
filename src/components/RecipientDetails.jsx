import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RecipientDetails extends Component {
  render() {
    return (
      <div>
      <div>
        <h1>Their Details</h1>
        <label htmlFor="recipient-name">Recipient first name</label>
        <input type="text" id="recipient-name" className="recipient" name="name" onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Recipient email</label>
        <input type="email" id="recipient-email" className="recipient" name="email" onChange={(e) => this.props.updateField(e)} />
      </div>
      <Link to="/sender">Your Details</Link>
      </div>
    )
  }
}