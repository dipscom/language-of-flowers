import React, { Component } from 'react';
import TransitionGroup from 'react-addons-transition-group'
import { IndexLink } from 'react-router';
// import bouquets from './data/bouquets';
import flowers from './data/flowers';
import products from './data/products';
// import Bouquet from './components/Bouquet';
// import Introduction from './components/Introduction';
// import Description from './components/Description';
// import Form from './components/Form';
// import Confirmation from './components/Confirmation';

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
    // this.nextStage = this.nextStage.bind(this);
    // this.prevStage = this.prevStage.bind(this);
    this.selectBouquet = this.selectBouquet.bind(this);
    this.updateField = this.updateField.bind(this);
    this.bouquetMeaning = this.bouquetMeaning.bind(this);
    this.reset = this.reset.bind(this);
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
  // nextStage() {
  //   this.setState({
  //     stage : this.state.stage + 1
  //   });
  // }
  // prevStage() {
  //   this.setState({
  //     stage : this.state.stage - 1
  //   });
  // }
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
    // if (bouquet.length >= 3) {
    //   this.setState({ progress : true });
    // }  else {
    //   this.setState({ progress : false });
    // }
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
  // showStage() {
  //   switch (this.state.stage) {
  //     default:
  //       return <Introduction nextStage={this.nextStage} />
  //     case 1:
  //       return <Introduction nextStage={this.nextStage} />
  //     case 2:
  //       return <Description
  //               nextStage={this.nextStage}
  //               prevStage={this.prevStage} />
  //     case 3:
  //       return <Form
  //               bouquet={this.state.bouquet}
  //               flowers={this.state.flowers}
  //               selectBouquet={this.selectBouquet}
  //               nextStage={this.nextStage}
  //               prevStage={this.prevStage}
  //               recipient={this.state.recipient}
  //               sender={this.state.sender}
  //               updateField={this.updateField}
  //               bouquetMeaning={this.bouquetMeaning} />
  //     case 4:
  //       return <Confirmation
  //               bouquet={this.state.bouquet}
  //               flowers={this.state.flowers}
  //               nextStage={this.nextStage}
  //               prevStage={this.prevStage}
  //               recipient={this.state.recipient}
  //               sender={this.state.sender}
  //               bouquetMeaning={this.bouquetMeaning} />
  //   }
  // }
  render() {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[1] || 'root';

    return (
      <div>
        <TransitionGroup data-route={pathname}>
          {this.props.children && React.cloneElement(this.props.children,
            {...this.state,
              selectBouquet: this.selectBouquet,
              bouquetMeaning: this.bouquetMeaning,
              updateField: this.updateField,
              key: key
            })}
        </TransitionGroup>
      <IndexLink to="/" onClick={this.reset}>Start Again</IndexLink>
      </div>
    )

  }
}
