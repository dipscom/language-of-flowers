import React, { Component } from 'react';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';


export default class Form extends Component {
  constructor(){
    super();
    this.renderNavigation = this.renderNavigation.bind(this);
    this.getActiveFlower = this.getActiveFlower.bind(this);
    this.state = {
      activeFlower: null
    }
  }
  componentWillMount(){
    if (!this.state.activeFlower) {
      this.setState({
        activeFlower: Object.keys(this.props.flowers)[0]
      });
    }
  }
  getActiveFlower(key) {
    if (this.state.activeFlower !== key) {
      this.setState({
        activeFlower: key
      })
    }
  }
  renderNavigation(key) {
    const index = this.state.stages.indexOf(key) + 1;
    let checked = false;
    if (index === this.state.currentStage) {
      checked = true;
    }
    return (
      <input key={key.toLowerCase().replace(/ /g, '-')} ref={key.replace(/ /g, '')} type="radio" name="navigation" value={index} defaultChecked={checked} onClick={(e) => this.selectStage(e)} />
      )
  }

  render() {

    // console.log("Render Form");

    const parentProps = {
      bouquet:[...this.props.bouquet],
      activeFlower: this.state.activeFlower,
      getActiveFlower: this.getActiveFlower,
      flowers:{...this.props.flowers},
      selectBouquet: this.props.selectBouquet,
      bouquetMeaning: this.props.bouquetMeaning,
      recipient:{...this.props.recipient},
      sender:{...this.props.sender},
      updateField: this.props.updateField};
    return (
      <div
        className="stage"
        key={this.props.location.pathname.replace('/', '')}
        ref={
          (el) => {
            this.el = el;
          }
        }
      >
        <div id={this.props.location.pathname.replace('/', '')} className="form">
          <div>
          <TransitionGroup component="div" className="column left">
            {this.props.left && React.cloneElement(this.props.left, parentProps)}
          </TransitionGroup>

          <svg id="line-separator" className="line-decoration" viewBox="0 0 2 860">
            <path d="M0.5 0 V860" vectorEffect="non-scaling-stroke"  />
          </svg>

          {/*It is possible that this TransitionGroup is not needed */}
          <TransitionGroup component="div" className="column right">
            {this.props.right && React.cloneElement(this.props.right, parentProps)}
          </TransitionGroup>

          <nav id="form-navigation">
            <Link to="/create-bouquet" title="Create Bouquet"></Link>
            <Link to="/view-bouquet" title="View Bouquet"></Link>
            <Link to="/recipient" title="Recipient"></Link>
            <Link to="/sender" title="Sender"></Link>
          </nav>
          </div>
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, delay) {
    TweenMax.from(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback) {
    TweenMax.to(this.el, 1, { // eslint-disable-line
      autoAlpha:0,
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {
    // console.log("Form Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    // console.log("Form Did enter");
  }

  componentWillAppear(callback) {
    // console.log("Form Will appear");
  }

  componentDidAppear() {
    // console.log("Form Did appear");
  }

  componentWillLeave(callback) {
    // console.log("Form Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    // console.log("Form Did leave");
  }

}
