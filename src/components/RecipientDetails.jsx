import React, { Component } from 'react';
import { Link } from 'react-router';

export default class RecipientDetails extends Component {
  
  render() {
    let linkClasses = 'button';
    if (this.props.bouquet.length === 3 && this.props.recipient.name !== '' && this.props.recipient.valid) {
      linkClasses += ' active';
    }
    return (
      <div id="details-form">

        <h1>Their Details
          <svg className="doubleline-decoration" viewBox="0 0 1400 40">
            <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
            <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
          </svg>
        </h1>
        <label htmlFor="recipient-name">Recipient first name</label>
        <input type="text" id="recipient-name" className="recipient" name="name" value={this.props.recipient.name} placeholder="Name" required onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Recipient email</label>
        <input type="email" id="recipient-email" className="recipient" name="email" value={this.props.recipient.email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />

      <Link className={linkClasses} to="/sender">Your Details</Link>
      </div>
    )
  }
}
