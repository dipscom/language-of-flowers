import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CreateBouquet extends Component {
  constructor() {
    super();
    this.bouquetList = this.bouquetList.bind(this);
    this.renderFlower = this.renderFlower.bind(this);
    this.state = {
      flower: null
    }
  }
  bouquetList(key) {
    const flower = this.props.flowers[key];
    return (
      <li key={key}><strong>{flower.name}</strong> ({flower.meaning})</li>
      )
  } 
  renderFlower(key) {
    const flower = this.props.flowers[key];
    const styles = {
      backgroundImage: 'url(/images/flowers/' + key + '.png)',
    };
    let checked = false,
        disabled = false;
    if (this.props.bouquet.length >= 3) {
      if (flower.selected === true) {
        checked = true;
      } else {
        disabled = true;
      }  
    } else {
      disabled = false; 
    }
    return (
      <label key={key}>
      <div>
      <input name="flower" value={key} type="checkbox" style={styles} defaultChecked={checked} disabled={disabled} onMouseOver={() => this.props.activeFlower(key)} onClick={() => this.props.selectBouquet(key)} /></div>
      <div><h2>{flower.name}</h2>
      <h3>Meaning</h3>
      <strong>{flower.meaning}</strong>
      <p>{flower.description}</p></div>
      </label>
    )
  }
  componentWillMount(){
    if (!this.state.flower) {
      this.setState({
        flower: Object.keys(this.props.flowers)[0]
      });
    }
  }
  render() {
    return (
      <div id="select-flowers">
       
          <h1>Create your bouquet</h1>
          <p>Select 3 flowers:</p>
          <form>{
            Object
            .keys(this.props.flowers)
            .map(this.renderFlower) 
          }</form>
          <div>
          <ol>
            {this.props.bouquet.map(this.bouquetList)}   
          </ol>
          <Link className="button" to="/view-bouquet">View your bouquet</Link>
          </div>
    
      </div>
    )
  }
}