import React, { Component } from 'react';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';


export default class Form extends Component {
  constructor(){
    super();
    this.renderNavigation = this.renderNavigation.bind(this);
    this.getActiveFlower = this.getActiveFlower.bind(this);
    this.state = {
      activeFlower: null,
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
            <Link to="/create-bouquet" title="Create Bouquet" activeClassName="current" className="active"></Link>
            <Link to="/view-bouquet" title="View Bouquet" activeClassName="current" className={(this.props.bouquet.length === 3 ? 'active' : '')}></Link>
            <Link to="/recipient" title="Recipient" activeClassName="current" className={(this.props.bouquet.length === 3 ? 'active' : '')}></Link>


            <Link to="/sender" title="Sender" activeClassName="current" className={(this.props.bouquet.length === 3 ? (this.props.recipient.name !== '' && this.props.recipient.valid ? 'active' : '') : '')}></Link>
          </nav>
          </div>
        </div>
      </div>
    )
  }




  /* Animation */
  animateIn(callback, trg, delay) {
    TweenMax.from(trg, 0.5, { // eslint-disable-line
      autoAlpha:0,
      delay: delay || 0,
      onComplete:callback
    });
  }

  animateOut(callback, trg) {
    TweenMax.to(trg, 0.5, { // eslint-disable-line
      autoAlpha:0,
      ease: Power2.easeIn, // eslint-disable-line
      onComplete:callback
    });
  }


  /* React Animation Callbacks */
  componentWillEnter(callback) {

    const currPath = this.props.location.pathname;
    let currentTarget = this.el;

    console.log("Form Will enter", currPath);

    switch (currPath) {
      case "/create-bouquet":
        this.animateIn(callback, currentTarget, 0.5);
        break;
      case "/view-bouquet":
        this.animateIn(callback, ["#bouquet","#bouquet-list"], 0.5);
        break;
      case "/recipient":
        this.animateIn(callback, ["#recipient"], 0.5);
        break;
      case "/sender":
        this.animateIn(callback, ["#sender"], 0.5);
        break;
      default:

    }
  }

  componentDidEnter() {
    // console.log("Form Did enter");
  }

  componentWillAppear(callback) {
    // console.log("Form Will appear");
    this.animateIn(callback, this.el, 3);
  }

  componentDidAppear() {
    // console.log("Form Did appear");
  }

  componentWillLeave(callback) {
    const currPath = this.props.location.pathname;
    let currentTarget = this.el;

    console.log("Form Will leave", currPath);

    switch (currPath) {
      case "/create-bouquet":
        this.animateOut(callback, ["#select-flowers", "#flowersDetails", "#view-bouquet-bt"]);
        break;
      case "/view-bouquet":
        this.animateOut(callback, ["#bouquet-list"]);
        break;
      case "/recipient":
        this.animateOut(callback, ["#recipient"]);
        break;
      case "/sender":
        this.animateOut(callback, currentTarget);
        break;
      default:

    }
  }

  componentDidLeave() {
    // console.log("Form Did leave");
  }

}
