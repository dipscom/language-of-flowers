import React, { Component } from 'react';
import CreateBouquet from './CreateBouquet';
import ViewBouquet from './ViewBouquet';
import RecipientDetails from './RecipientDetails';
import SenderDetails from './SenderDetails';

export default class Form extends Component {
  constructor(){
    super();
    this.nextStage = this.nextStage.bind(this);
    this.prevStage = this.prevStage.bind(this);
    this.selectStage = this.selectStage.bind(this);
    this.renderNavigation = this.renderNavigation.bind(this);
    this.state = {
      'currentStage': 1,
      stages: ['Create Bouquet', 'View Bouquet', 'Recipient Details', 'Sender Details']
    }
  }
  nextStage() {
    const currentStage = this.state.currentStage + 1
    this.setState({
      'currentStage': currentStage
    });
    const stage = this.state.stages[currentStage - 1].replace(/ /g, '');
    this.refs[stage].checked = true;
  }
  prevStage() {
    const currentStage = this.state.currentStage - 1
    this.setState({
      'currentStage': currentStage
    });
    const stage = this.state.stages[currentStage - 1].replace(/ /g, '');
    this.refs[stage].checked = true;
  }
  selectStage(e) {
    this.setState({
      'currentStage': parseInt(e.target.value, 10)
    });
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
  showStage() {
    switch (this.state.currentStage) {
      default:
        return <CreateBouquet 
                bouquet={this.props.bouquet}
                flowers={this.props.flowers}
                selectBouquet={this.props.selectBouquet} 
                nextStage={this.nextStage} />
      case 1:
        return <CreateBouquet
                bouquet={this.props.bouquet}
                flowers={this.props.flowers}
                selectBouquet={this.props.selectBouquet} 
                nextStage={this.nextStage} />
      case 2:
      return <ViewBouquet 
              bouquet={this.props.bouquet}
              bouquetMeaning={this.props.bouquetMeaning}
              flowers={this.props.flowers}
              nextStage={this.nextStage}
              prevStage={this.prevStage}
               />
      case 3:
      return <RecipientDetails 
              nextStage={this.nextStage}
              recipient={this.props.recipient}
              updateField={this.props.updateField} />
      case 4:
      return <SenderDetails 
              nextStage={this.props.nextStage}
              sender={this.props.sender}
              updateField={this.props.updateField} />
    }
  }
  render() {
    const id = this.state.stages[this.state.currentStage - 1].toLowerCase().replace(/ /g, '-');
    return (
      <div id={id} className="stage form">
        <img id="bouquet-image" src={'/images/bouquets/' + [...this.props.bouquet].sort().toString().replace(/,/g, '_') + '.png'} alt="Bouquet" title="Bouquet" />
        {this.showStage()}
        <form id="form-navigation">
          {this.state.stages.map(this.renderNavigation)}
        </form>
      </div>
    )
  }
}