import React, { Component } from "react";
import { browserHistory } from "react-router";
import TransitionGroup from "react-addons-transition-group";
import flowers from "../data/flowers";
import products from "../data/products";
import Background from "./Background";
import Overlay from "./Overlay";

const initialState = {
  bouquet: [],
  flowers: flowers,
  products: products,
  recipient: {
    name: "",
    email: "",
    valid: false,
  },
  sender: {
    name: "",
    email: "",
    valid: false,
  },
  steps: {
    current: 1,
    total: 4,
  },
  terms: false,
  navigation: {
    disabled: false,
  },
  sendStatus: "idle",
  sendError: null,
};

export default class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.selectFlower = this.selectFlower.bind(this);
    this.updateField = this.updateField.bind(this);
    this.buildShareLink = this.buildShareLink.bind(this);
    this.sendBouquet = this.sendBouquet.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentWillMount() {
    let bouquet, recipient, sender, flowers, products, steps;
    const accessTime = Number(localStorage.getItem("accessTime")) + 20000,
      timeStamp = Date.now(); // eslint-disable-line

    if (Object.keys(this.props.location.query).length !== 0) {
      if (
        this.props.location.query.bouquet &&
        this.props.location.query.name &&
        this.props.location.query.email &&
        this.props.location.query.sender
      ) {
        bouquet = this.props.location.query.bouquet.split(",");
        recipient = {
          name: this.props.location.query.name,
          email: this.props.location.query.email,
        };
        sender = { name: this.props.location.query.sender };
        flowers = flowers; // eslint-disable-line
        this.setState({
          steps: {
            current: 0,
          },
        });
      } else {
        if (window.location.pathname !== "/") {
          window.location = "/";
        }
      }
    } else {
      if (window.location.pathname !== "/") {
        window.location = "/";
      }
    }
    if (bouquet) {
      this.setState({
        bouquet: bouquet,
      });
    }
    if (flowers) {
      this.setState({
        flowers: flowers,
      });
    }
    if (products) {
      this.setState({
        products: products,
      });
    }
    if (recipient) {
      this.setState({
        recipient: recipient,
      });
    }
    if (sender) {
      this.setState({
        sender: sender,
      });
    }
    if (steps) {
      this.setState({
        steps: steps,
      });
    }
  }
  buildShareLink() {
    const bouquet = this.state.bouquet.join(",");
    const name = encodeURIComponent(this.state.recipient.name);
    const email = encodeURIComponent(this.state.recipient.email);
    const sender = encodeURIComponent(this.state.sender.name);
    return `${window.location.origin}/viewbouquet?bouquet=${bouquet}&name=${name}&email=${email}&sender=${sender}`;
  }
  async sendBouquet(e) {
    e.preventDefault();
    this.setState({ sendStatus: "sending" });

    const link = this.buildShareLink();
    try {
      const resp = await fetch("/.netlify/functions/send-bouquet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: this.state.recipient.name,
          recipientEmail: this.state.recipient.email,
          senderName: this.state.sender.name,
          link,
          bouquetSize: this.state.bouquet.length,
        }),
      });
      const result = await resp.json();
      if (resp.ok && result.ok) {
        this.setState({ sendStatus: "sent" });
        browserHistory.push("/success");
      } else {
        this.setState({
          sendStatus: "error",
          sendError: result.error || "Something went wrong",
        });
      }
    } catch (err) {
      this.setState({
        sendStatus: "error",
        sendError: "Network error — please try again",
      });
    }
  }
  reset() {
    localStorage.removeItem("bouquet");
    localStorage.removeItem("flowers");
    localStorage.removeItem("products");
    localStorage.removeItem("recipient");
    localStorage.removeItem("sender");
    localStorage.removeItem("steps");
    localStorage.removeItem("terms");
    localStorage.removeItem("accessTime");
  }
  nextStep(e) {
    $("button.button, button.back-button").attr("disabled", true); // eslint-disable-line
    const steps = { ...this.state.steps };
    steps["current"] = this.state.steps.current + 1;
    this.setState({ steps, navigation: { disabled: true } });
  }
  prevStep(e) {
    $("button.button, button.back-button").attr("disabled", true); // eslint-disable-line
    const steps = { ...this.state.steps };
    steps["current"] = this.state.steps.current - 1;
    this.setState({ steps, navigation: { disabled: true } });
  }
  updateStep(i) {
    const steps = { ...this.state.steps };
    steps["current"] = i;
    this.setState({ steps, navigation: { disabled: true } });
  }
  enableButton() {
    this.setState({ navigation: { disabled: false } });
  }
  selectFlower(key) {
    let bouquet = this.state.bouquet;
    const index = this.state.bouquet.indexOf(key);
    const flowers = { ...this.state.flowers };

    if (index === -1) {
      if (bouquet.length < 3) {
        bouquet = bouquet.concat([key]);
        flowers[key].selected = true;
        this.setState({ bouquet, flowers });
      }
    } else {
      bouquet = [...bouquet.slice(0, index), ...bouquet.slice(index + 1)];
      flowers[key].selected = false;
      this.setState({ bouquet, flowers });
    }
  }
  updateField(e) {
    if (e.target.name === "terms") {
      this.setState({ terms: e.target.checked });
    } else if (e.target.name === "opt-in") {
      // no-op
    } else {
      const person = { ...this.state[e.target.className] };
      person[e.target.name] = e.target.value;
      if (e.target.type === "email") {
        person["valid"] = e.target.checkValidity();
      }
      this.setState({
        [e.target.className]: person,
      });
    }
  }
  render() {
    const { pathname } = this.props.location;
    const key = pathname || "root";
    return (
      <TransitionGroup component="div" id="container">
        <Background reset={this.reset} />
        {this.props.children &&
          React.cloneElement(this.props.children, {
            ...this.state,
            buildShareLink: this.buildShareLink,
            sendBouquet: this.sendBouquet,
            selectFlower: this.selectFlower,
            updateField: this.updateField,
            nextStep: this.nextStep,
            prevStep: this.prevStep,
            updateStep: this.updateStep,
            key: key,
            enableButton: this.enableButton,
          })}
        <Overlay steps={this.state.steps} location={this.props.location} />
      </TransitionGroup>
    );
  }
}
