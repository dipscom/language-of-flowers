import React, { Component } from 'react';
import flowers from '../data/flowers';
import products from '../data/products';
import Background from './Background';
// import TransitionGroup from 'react-addons-transition-group';
const initialState = {
  bouquet: [],
  flowers: flowers,
  products: products,
  recipient: {
    name: '',
    email: '',
    valid: false
  },
  sender: {
    name: '',
    email: '',
    valid: false
  },
  terms: false
};

export default class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.selectFlower = this.selectFlower.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  reset() {
    this.setState(initialState);
  }
  selectFlower(key) {
    console.log('selectFlower triggered');
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
  updateField(e) {
    if(e.target.name === 'terms') {
      this.setState({ 'terms': e.target.checked });
    } else {
      const person = {...this.state[e.target.className]};
      person[e.target.name] = e.target.value;
      if (e.target.type === 'email') {
        person['valid'] = e.target.checkValidity();
      }
      this.setState({
        [e.target.className] : person
      });
    }
  }
  render() {
    return (
      <div id="container">
        <Background reset={this.reset} />
        {this.props.children && React.cloneElement(this.props.children, {
            ...this.state, 
            selectFlower: this.selectFlower,
            updateField: this.updateField
          }
        )}
      </div>
    )
  }
}
