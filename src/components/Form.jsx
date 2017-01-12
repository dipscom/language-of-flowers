import React, { Component } from 'react';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';


export default class Form extends Component {
  constructor(){
    super();
    this.stageProps = this.stageProps.bind(this);
    this.renderNavigation = this.renderNavigation.bind(this);
    this.activeFlower = this.activeFlower.bind(this);
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
  activeFlower(key) {
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
  stageProps(name, side) {
    switch (name) {
      default:
        return null
      case 'Bouquet':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          bouquet:[...this.props.bouquet],

        });
      case 'Flower':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          activeFlower: this.state.activeFlower,
          flowers:{...this.props.flowers},
        });
      case 'CreateBouquet':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          bouquet:[...this.props.bouquet],
          flowers:{...this.props.flowers},
          selectBouquet: this.props.selectBouquet,
          activeFlower: this.activeFlower,
        });
       case 'ViewBouquet':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          bouquet:[...this.props.bouquet],
          flowers:{...this.props.flowers},
          bouquetMeaning: this.props.bouquetMeaning
        });
      case 'RecipientDetails':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          recipient:{...this.props.recipient},
          updateField: this.props.updateField
        });
      case 'SenderDetails':
        return React.cloneElement((side === 'left' ? this.props.left : this.props.right), {
          sender:{...this.props.sender},
          updateField: this.props.updateField
        });
     }
  }
  render() {
    const leftProps = this.stageProps(this.props.left.type.name, 'left');
    const rightProps = this.stageProps(this.props.right.type.name, 'right');

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
          <div className="column left">{(leftProps ? this.props.left && leftProps : this.props.left)}</div>
          <TransitionGroup component="div" className="column right">
              {(rightProps ? this.props.right && rightProps : this.props.right)}
          </TransitionGroup>
          <nav id="form-navigation">
            <Link to="/create-bouquet" title="Create Bouquet"></Link>
            <Link to="/view-bouquet" title="View Bouquet"></Link>
            <Link to="/recipient" title="Recipient"></Link>
            <Link to="/sender" title="Sender"></Link>
          </nav>
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
    console.log("CreateBouquet Will enter");
    this.animateIn(callback, 1);
  }

  componentDidEnter() {
    console.log("CreateBouquet Did enter");
  }

  componentWillAppear(callback) {
    console.log("CreateBouquet Will appear");
  }

  componentDidAppear() {
    console.log("CreateBouquet Did appear");
  }

  componentWillLeave(callback) {
    console.log("CreateBouquet Will leave");
    this.animateOut(callback);
  }

  componentDidLeave() {
    console.log("CreateBouquet Did leave");
  }

}
