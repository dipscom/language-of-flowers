import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SenderDetails extends Component {
  render() {
    let linkClasses = 'button';
    if (this.props.bouquet.length === 3 && this.props.recipient.name !== '' && this.props.recipient.valid && this.props.sender.name !== '' && this.props.sender.valid) {
      linkClasses += ' active';
    }
    return (
      <div id="sender" className="details-form">
      <div>
        <h1>Your Details
        <svg className="doubleline-decoration" viewBox="0 0 1400 40">
          <path className="segment" d="M0 1.5 H660 Q690 1.5, 700 20.5 Q710 1.5, 740 1.5 H1400" vectorEffect="non-scaling-stroke"  />
          <path className="segment" d="M0 8.5 H660 Q690 8.5, 700 28.5 Q710 8.5, 740 8.5 H1400" vectorEffect="non-scaling-stroke"  />
      </svg>
        </h1>
        <label htmlFor="sender-name">Your first name</label>
        <input type="text" id="sender-name" className="sender" name="name" value={this.props.sender.name} placeholder="Name" required onChange={(e) => this.props.updateField(e)} />
        <label htmlFor="recipient-email">Your email</label>
        <input type="email" id="sender-email" className="sender" name="email" value={this.props.sender.email} placeholder="Email" required onChange={(e) => this.props.updateField(e)} />
      </div>
      <Link className={linkClasses} to="/confirmation">Confirm & Send <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 221.1 127.4"><polygon points="0 0.3 221.1 64 0.1 127.4 35.4 66.9 "/></svg></Link>
      </div>
    )
  }
}
