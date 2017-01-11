import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RecipientDetails extends Component {
  render() {
    return (
      <div id="details-form">
      <div>
        <h1>Their Details</h1>
        <label htmlFor="recipient-name">Recipient first name</label>
        <input type="text" id="recipient-name" className="recipient" name="name" placeholder="Name" onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Recipient email</label>
        <input type="email" id="recipient-email" className="recipient" name="email" placeholder="Email" onChange={(e) => this.props.updateField(e)} />
      </div>
      <Link className="button" to="/sender">Your Details</Link>
      </div>
    )
  }
}