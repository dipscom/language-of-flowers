import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CreateBouquet extends Component {
  constructor() {
    super();
    this.flowerDetails = this.flowerDetails.bind(this);
    this.bouquetList = this.bouquetList.bind(this);
    this.renderFlower = this.renderFlower.bind(this);
    this.state = {
      flower: null
    }
  }
  flowerDetails(key) {
    if (this.state.flower !== key) {
      this.setState({
        flower: key
      })
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
      <input name="flower" value={key} type="checkbox" style={styles} defaultChecked={checked} disabled={disabled} onMouseOver={() => this.flowerDetails(key)} onClick={() => this.props.selectBouquet(key)} />
      <h2>{flower.name}</h2>
      <h3>Meaning</h3>
      <strong>{flower.meaning}</strong>
      <p>{flower.description}</p>
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
    const flowers = this.props.flowers;
    const activeFlower = this.state.flower;
    return (
      <div className="select-flowers">
        <div className="flowers-form">
          <h1>Create your bouquet</h1>
          <p>Select 3 flowers:</p>
          <form>{
            Object
            .keys(this.props.flowers)
            .map(this.renderFlower)
          }</form>
          <div>
          <ul>
            {this.props.bouquet.map(this.bouquetList) }   
          </ul>
          <Link to="/view-bouquet">View your bouquet</Link>
          </div>
        </div>
        <div className="flower-description">
          <img src={'/images/flowers/' + activeFlower + '.png'} alt={flowers[activeFlower].name} title={flowers[activeFlower].name} />
          <h1>{flowers[activeFlower].name}</h1>
          <strong>{flowers[activeFlower].meaning}</strong>
          <p>{flowers[activeFlower].description}</p>
        </div>
      </div>
    )
  }
}