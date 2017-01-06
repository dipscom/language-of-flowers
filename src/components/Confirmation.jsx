import React, { Component } from 'react'

export default class Confirmation extends Component {
  render() {
    return (
      <div>
      <div>
        <h1>Confirm & Send</h1>
        <p>On this fine day we shalt send your message of:</p>
        <ul>
            { this.props.bouquet.map(this.props.bouquetMeaning) }   
        </ul>
        <p>to your dearest <span>{this.props.recipient.name}</span> at the royal postal address of <span>{this.props.recipient.email}</span> from <span>{this.props.sender.name}</span><span>({this.props.sender.email})</span></p>
        <p className="terms">Be in with a chance to win the full Penhaligon's portraits collection.</p>
        <p className="terms">plus join the very Penhaligon's club and discover our online secrets <label htmlFor="terms">I agree with the Terms and Conditions/Privacy Policy</label><input type="checkbox" name="terms" /></p>
      </div>
      <button onClick={this.props.nextStage}>Send Now</button>
      </div>
    )
  }
}