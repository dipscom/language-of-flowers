import React, { Component } from 'react';

export default class MyBouquet extends Component{
  render() {
    return (
    	<div>
        <h1>Dear <span>{this.props.recipient.name}</span><hr /></h1>
        <p>A certain someone has sent you a beautiful gift.</p>
        <p>Some things are unutterable and secret. Other thoughts are so hard to say...<br />Thank Heavens for the coded art of flowers.</p>
        <p>Penhaligon's invites your to decode your message from <span>{this.props.sender.name}</span></p>
        </div>
    )
  }
}