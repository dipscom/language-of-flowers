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
  }
};
export default class App extends Component {
  constructor(){
    super();
    this.bouquetMeaning = this.bouquetMeaning.bind(this);
    this.reset = this.reset.bind(this);
    this.selectBouquet = this.selectBouquet.bind(this);
    this.updateField = this.updateField.bind(this);
    this.state = initialState;
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
      <li key={key}>
        <div>
          <img src={'/images/flowers/' + key + '.png'} alt={flower.name} title={flower.name}
          />
        </div>
        <div>
          <h2>{flower.name}</h2>
          <strong>{flower.meaning}</strong>
          <p>{flower.description}</p>
        </div>
      </li>)
  }
  updateField(e) {
    const person = {...this.state[e.target.className]};
    person[e.target.name] = e.target.value;
    this.setState({ [e.target.className] : person });
  }
  render() {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[1] || 'root';
    return (
        <TransitionGroup component="div">
          <Background location={this.props.location} />
          {this.props.children && React.cloneElement(this.props.children,
          {bouquet:[...this.state.bouquet],
           flowers:{...this.state.flowers},
           products:{...this.state.products},
           recipient:{...this.state.recipient},
           sender:{...this.state.sender},
           selectBouquet: this.selectBouquet,
           bouquetMeaning: this.bouquetMeaning,
           updateField: this.updateField,
           key: key,})}
          <Overlay location={this.props.location} />
        </TransitionGroup>
    )
  }
}
