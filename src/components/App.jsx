import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group'
import flowers from '../data/flowers';
import products from '../data/products';
import Background from './Background';
import Overlay from './Overlay';
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
steps: {
  current: 1,
  total: 4
},
terms: false,
navigation: {
  disabled: false
}
};

export default class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.selectFlower = this.selectFlower.bind(this);
    this.updateField = this.updateField.bind(this);
    this.mailChimp = this.mailChimp.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillMount(){
    let bouquet, recipient, sender, flowers, products, steps;
    const accessTime = Number((localStorage.getItem('accessTime'))) + 20000, timeStamp = Date.now(); // eslint-disable-line

    if(Object.keys(this.props.location.query).length !== 0) {
      if (this.props.location.query.bouquet && this.props.location.query.name && this.props.location.query.email && this.props.location.query.sender) {
        bouquet = this.props.location.query.bouquet.split(',');
        recipient = {
          name: this.props.location.query.name,
          email: this.props.location.query.email
         };
        sender = { name: this.props.location.query.sender };
        flowers = flowers; // eslint-disable-line
        this.setState({
          steps: {
            current: 0
          }
        });
      } else {
        if(window.location.pathname !== '/') {
          window.location = '/';
        }
      }
    }
    // else if (accessTime > timeStamp) {
    //     if(localStorage.getItem('bouquet')) {
    //       bouquet = localStorage.getItem('bouquet').split(',');
    //     }
    //     if(localStorage.getItem('recipient')) {
    //       recipient = {...JSON.parse(localStorage.getItem('recipient')) };
    //     }
    //     if(localStorage.getItem('sender')) {
    //       sender = {...JSON.parse(localStorage.getItem('sender'))};
    //     }
    //     if(localStorage.getItem('flowers')) {
    //       flowers = {...JSON.parse(localStorage.getItem('flowers'))};
    //     }
    //     if(localStorage.getItem('products')) {
    //       products = {...JSON.parse(localStorage.getItem('products'))};
    //     }
    //     if(localStorage.getItem('steps')) {
    //       steps = {...JSON.parse(localStorage.getItem('steps'))};
    //     }
    //   }
      else {
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
    if(steps) {
      this.setState({
        steps : steps
      });
    }
  }
  // componentWillUpdate(nextProps, nextState) {
  //   localStorage.setItem('bouquet', nextState.bouquet);
  //   localStorage.setItem('flowers', JSON.stringify(nextState.flowers));
  //   localStorage.setItem('products', JSON.stringify(nextState.products));
  //   localStorage.setItem('recipient', JSON.stringify(nextState.recipient));
  //   localStorage.setItem('sender', JSON.stringify(nextState.sender));
  //   localStorage.setItem('steps', JSON.stringify(nextState.steps));
  //   localStorage.setItem('terms', nextState.terms);
  //   localStorage.setItem('accessTime', Date.now());
  // }
  // componentDidUpdate() {
  //   console.log('This is where we need to add Google analytics if it doesnt update page views automatically with react router');
  // }
  mailChimp(){
    const decodeData = {
        EMAIL: this.state.recipient.email,
        NAME: this.state.recipient.name,
        SNAME: this.state.sender.name,
        SEMAIL: this.state.sender.email,
        BOUQUET: this.state.bouquet.toString()
    };
    const senderData = this.state.sender.name + ',' + this.state.sender.email + ',' + this.state.recipient.name + ',' + this.state.recipient.email + ',' + this.state.bouquet.toString() + ',' + this.state.terms;
    $.ajax({ // eslint-disable-line
      url: '//penhaligons.us15.list-manage.com/subscribe/post?u=698a57fe6fe03b39ba31283b9&amp;id=c0307ad06b',
      data: decodeData,
      dataType: 'jsonp',
    });
    // $.ajax({ // eslint-disable-line
    //   url: '//penhaligons.us15.list-manage.com/subscribe/post?u=698a57fe6fe03b39ba31283b9&amp;id=9ba6c73073',
    //   data: senderData,
    //   dataType: 'jsonp',
    //   success:function(data){
    //     console.log(data);
    //   }
    // });
    // $.ajax({ // eslint-disable-line
    //   url: "https://docs.google.com/a/kotacreative.co.uk/forms/d/1_JANgXrIfqPR8NCaNo1wDaVOCt2275S5S11KTXaIsgs/formResponse",
    //   data: {
    //     'Sender Email': this.state.sender.email,
    //     "Sender Name": this.state.sender.name,
    //     "Recipient Email": this.state.recipient.email,
    //     "Recipient Name": this.state.recipient.name,
    //     "Bouquet": this.state.bouquet.toString()
    //   },
    //   type: "POST",
    //   dataType: "xml",
    //   statusCode: {
    //     0: function() {
    //       //Success message
    //   },
    //     200: function() {
    //       //Success Message
    //     }
    //   }
    // });
    $.post('submit.php', {data:senderData}); // eslint-disable-line
  }
  reset() {
    // this.setState(initialState);
    localStorage.removeItem('bouquet');
    localStorage.removeItem('flowers');
    localStorage.removeItem('products');
    localStorage.removeItem('recipient');
    localStorage.removeItem('sender');
    localStorage.removeItem('steps');
    localStorage.removeItem('terms');
    localStorage.removeItem('accessTime');
    ga('send', 'event', 'Navigation', 'Reset'); // eslint-disable-line
  }
  nextStep(e) {
    // e.currentTarget.setAttribute('disabled', true);
    $('button.button, button.back-button').attr('disabled', true); // eslint-disable-line
    const steps = {...this.state.steps};
    steps['current'] = this.state.steps.current + 1;
    this.setState({ steps, navigation:{disabled:true} });
    ga('send', 'event', 'Navigation', 'Next Step', 'Build Bouquet', this.state.steps.current + 1); // eslint-disable-line
  }
  prevStep(e) {
    // e.currentTarget.setAttribute('disabled', true);
    $('button.button, button.back-button').attr('disabled', true); // eslint-disable-line
    const steps = {...this.state.steps};
    steps['current'] = this.state.steps.current - 1;
    this.setState({ steps, navigation:{disabled:true} });
    ga('send', 'event', 'Navigation', 'Previous Step', 'Build Bouquet', this.state.steps.current - 1); // eslint-disable-line
  }
  updateStep(i) {
    const steps = {...this.state.steps};
    steps['current'] = i;
    this.setState({ steps, navigation:{disabled:true} });
    ga('send', 'event', 'Navigation', 'Form Navigation', 'Build Bouquet', i); // eslint-disable-line
  }
  enableButton() {
    // console.log("enableButton");
    this.setState({navigation:{disabled:false}})
  }
  selectFlower(key) {
    // console.log('selectFlower triggered');
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
    } else if (e.target.name === 'opt-in') {
      $.post('opt-in.php', {email: this.state.recipient.email, optin: e.target.checked}); // eslint-disable-line
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
    const { pathname } = this.props.location;
    const key = pathname || 'root';
    // NOTE
    // We need to look into how we are building this key, whether we need to split the forward slash or not. Currently, it works without splitting it. MUST double check the live version!
    // const key = pathname.split('/')[1] || 'root';
    return (
      <TransitionGroup component="div" id="container">
        <Background reset={this.reset} />
        {this.props.children && React.cloneElement(
          this.props.children, {
            ...this.state,
            mailChimp: this.mailChimp,
            selectFlower: this.selectFlower,
            updateField: this.updateField,
            nextStep: this.nextStep,
            prevStep: this.prevStep,
            updateStep: this.updateStep,
            key: key,
            enableButton: this.enableButton
          }
        )}
        <Overlay steps={this.state.steps} location={this.props.location}/>
      </TransitionGroup>
    )
  }
}
