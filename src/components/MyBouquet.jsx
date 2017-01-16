import React, { Component } from 'react';

export default class MyBouquet extends Component{

  render() {
    console.log(this.props.location.query);
    return (
    	<div
        id="my-bouquet"
        key="my-bouquet"
        className="stage"
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div>
        <div>
        <img className="logo" src="./images/lof-logo.png" alt="The Language of Flowers" title="The Language of Flowers" />
        <h1>Dear <span>{this.props.location.query.recipient}</span><hr /></h1>
        <p>A certain someone has sent you a beautiful gift.</p>
        <p>Some things are unutterable and secret. Other thoughts are so hard to say...<br />Thank Heavens for the coded art of flowers.</p>
        <p>Penhaligon's invites your to decode your message from <span>{this.props.location.query.sender}</span></p>
        </div></div></div>
    )
  }
}