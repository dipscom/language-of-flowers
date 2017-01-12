import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group'
import flowers from './data/flowers';
import products from './data/products';
import Overlay from './components/Overlay'
import Background from './components/Background'

const initialState = {
  bouquet: [],
  flowers: flowers,
  products: products,
  recipient: {
    name: null,
    email: null
  },
  sender: {
    name: null,
    email: null
  },
  stage: 1
};
export default class App extends Component {
  constructor(){
    super();
    this.bouquetMeaning = this.bouquetMeaning.bind(this);
    this.reset = this.reset.bind(this);
    this.selectBouquet = this.selectBouquet.bind(this);
    this.stageProps = this.stageProps.bind(this);
    this.updateField = this.updateField.bind(this);
    this.state = initialState;
  }
  componentWillMount(){
    const stageRef = Number(localStorage.getItem('stage'));
    if(stageRef) {
      this.setState({
        stage : stageRef
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('stage', nextState.stage);
  }
  reset() {
    this.setState(initialState);
  }
  selectBouquet(key) {
    let bouquet = this.state.bouquet;
    const index = this.state.bouquet.indexOf(key);
    const flowers = {...this.state.flowers};
    if ( index === -1 ) {
      if (bouquet.length < 3) {
        bouquet = bouquet.concat([key])
        flowers[key].selected = true;

        this.setState({ bouquet, flowers });
      }
    } else {
      bouquet = [...bouquet.slice(0,index), ...bouquet.slice(index+1)];
      flowers[key].selected = false;
      this.setState({ bouquet, flowers });
    }
  }
  bouquetMeaning(key) {
    const flower = this.state.flowers[key];
    return (
      <li key={key}>{flower.meaning}</li>
      )
  }
  updateField(e) {
    const person = {...this.state[e.target.className]};
    person[e.target.name] = e.target.value;
    this.setState({ [e.target.className] : person });
  }
  stageProps(name, key) {
    switch (name) {
      default:
      return React.cloneElement(this.props.children, {
        key: key,
        loaded:this.state.loaded
      });
      case 'Form':
        return React.cloneElement(this.props.children, {
          bouquet:[...this.state.bouquet],
          flowers:{...this.state.flowers},
          recipient:{...this.state.recipient},
          sender:{...this.state.sender},
          selectBouquet: this.selectBouquet,
          bouquetMeaning: this.bouquetMeaning,
          updateField: this.updateField,
          key: key,
          loaded:this.state.loaded
        });
      case 'Confirmation':
        return React.cloneElement(this.props.children, {
          bouquet:[...this.state.bouquet],
          flowers:{...this.state.flowers},
          recipient:{...this.state.recipient},
          sender:{...this.state.sender},
          bouquetMeaning: this.bouquetMeaning,
          key: key,
          loaded:this.state.loaded
        });
     }
  }
  render() {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[1] || 'root';
    const parentProps = this.stageProps(this.props.children.type.name, key);

    return (
        <TransitionGroup component="div">
          <Background location={this.props.location} />
          {parentProps}
          <Overlay location={this.props.location} />
        </TransitionGroup>
    )
  }
}
