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
  componentWillMount(){
    let bouquet, recipient, sender, flowers, products;
    const accessTime = Number((localStorage.getItem('accessTime'))) + 20000, timeStamp = Date.now();
    if(Object.keys(this.props.location.query).length !== 0) {

      if (this.props.location.query.bouquet && this.props.location.query.recipient && this.props.location.query.sender) {
        bouquet = this.props.location.query.bouquet.split(',');
        recipient = { name: this.props.location.query.recipient };
        sender = { name: this.props.location.query.sender };
      } else {
        if(window.location.pathname !== '/') {
        window.location = '/';
      }
      }
    } else if (accessTime > timeStamp) {
        if(localStorage.getItem('bouquet')) {
          bouquet = localStorage.getItem('bouquet').split(',');
        } 
        if(localStorage.getItem('recipient')) {
          recipient = {...JSON.parse(localStorage.getItem('recipient')) };
        }
        if(localStorage.getItem('sender')) {
          sender = {...JSON.parse(localStorage.getItem('sender'))}; 
        }
        if(localStorage.getItem('flowers')) {
          flowers = {...JSON.parse(localStorage.getItem('flowers'))};  
        }
        if(localStorage.getItem('products')) {
          products = {...JSON.parse(localStorage.getItem('products'))};
        }
      } else {
      if(window.location.pathname !== '/') {
        window.location = '/';
      }
    }
    if(bouquet) {
      this.setState({
        bouquet : bouquet
      });
    }
    if(flowers) {
      this.setState({
        flowers : flowers
      });
    }
    if(products) {
      this.setState({
        products : products
      });
    }
    if(recipient) {
      this.setState({
        recipient : recipient
      });
    }
    if(sender) {
      this.setState({
        sender : sender
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('bouquet', nextState.bouquet);
    localStorage.setItem('flowers', JSON.stringify(nextState.flowers));
    localStorage.setItem('products', JSON.stringify(nextState.products));
    localStorage.setItem('recipient', JSON.stringify(nextState.recipient));
    localStorage.setItem('sender', JSON.stringify(nextState.sender));
    localStorage.setItem('terms', nextState.terms);
    localStorage.setItem('accessTime', Date.now());
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
