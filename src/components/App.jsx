import React, { Component, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import flowers from "../data/flowers";
import products from "../data/products";
import Background from "./Background";
import Overlay from "./Overlay";
import AnimatedSwitch from "./AnimatedSwitch";
import Introduction from "./Introduction";
import Description from "./Description";
import Form from "./Form";
import Confirmation from "./Confirmation";
import Success from "./Success";
import MyBouquet from "./MyBouquet";
import Share from "./Share";

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
};

// Maps a pathname to the page component rendered for it. Kept as a plain
// table (rather than nested <Route>/<Outlet>) so AnimatedSwitch can hold a
// direct `component` reference + ref per route, the same way it already does
// for Form's left/right columns and FlowerDetails' active flower.
const routeTable = {
  "/": { component: Introduction, key: "introduction" },
  "/description": { component: Description, key: "description" },
  "/buildbouquet": { component: Form, key: "buildbouquet" },
  "/confirmation": { component: Confirmation, key: "confirmation" },
  "/success": { component: Success, key: "success" },
  "/mybouquet": { component: MyBouquet, key: "mybouquet" },
  "/viewbouquet": { component: Form, key: "viewbouquet" },
  "/share": { component: Share, key: "share" },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState, ...props.initialOverrides };
    this.reset = this.reset.bind(this);
    this.selectFlower = this.selectFlower.bind(this);
    this.updateField = this.updateField.bind(this);
    this.mailChimp = this.mailChimp.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  mailChimp() {}
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
    document
      .querySelectorAll("button.button, button.back-button")
      .forEach((el) => el.setAttribute("disabled", true));
    const steps = { ...this.state.steps };
    steps["current"] = this.state.steps.current + 1;
    this.setState({ steps, navigation: { disabled: true } });
  }
  prevStep(e) {
    document
      .querySelectorAll("button.button, button.back-button")
      .forEach((el) => el.setAttribute("disabled", true));
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
    const route = routeTable[this.props.location.pathname] || routeTable["/"];
    return (
      <div id="container">
        <Background reset={this.reset} />
        <AnimatedSwitch
          component={route.component}
          componentKey={route.key}
          {...this.state}
          mailChimp={this.mailChimp}
          selectFlower={this.selectFlower}
          updateField={this.updateField}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          updateStep={this.updateStep}
          enableButton={this.enableButton}
        />
        <Overlay steps={this.state.steps} location={this.props.location} />
      </div>
    );
  }
}

// Reads the bouquet/recipient/sender query string used for shared-bouquet
// links (?bouquet=...&name=...&email=...&sender=...) and bounces back to "/"
// when it's missing or incomplete on a deep-linked, non-root path.
export default function AppRoute() {
  const location = useLocation();
  const navigate = useNavigate();

  const { initialOverrides, needsRedirect } = useMemo(() => {
    const query = new URLSearchParams(location.search);
    if ([...query.keys()].length !== 0) {
      if (
        query.get("bouquet") &&
        query.get("name") &&
        query.get("email") &&
        query.get("sender")
      ) {
        return {
          initialOverrides: {
            bouquet: query.get("bouquet").split(","),
            recipient: {
              name: query.get("name"),
              email: query.get("email"),
            },
            sender: { name: query.get("sender") },
            steps: { current: 0 },
          },
          needsRedirect: false,
        };
      }
      return { initialOverrides: null, needsRedirect: location.pathname !== "/" };
    }
    return { initialOverrides: null, needsRedirect: location.pathname !== "/" };
    // Only re-derive when the query string itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (needsRedirect) {
      navigate("/", { replace: true });
    }
  }, [needsRedirect, navigate]);

  return <App location={location} initialOverrides={initialOverrides} />;
}
