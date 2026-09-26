import { Routes, Route, useLocation } from "react-router";
import flowers from "../data/flowers";
import products from "../data/products";
import Background from "./Background";
import Overlay from "./Overlay";
import Introduction from "./Introduction";
import Description from "./Description";
import Form from "./Form";
import Confirmation from "./Confirmation";
import Success from "./Success";
import MyBouquet from "./MyBouquet";
import Share from "./Share";
import { AppStateProvider } from "../state/AppStateContext";

function App({ location }) {
  return (
    <div id="container">
      <Background location={location} />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/description" element={<Description />} />
        <Route path="/buildbouquet" element={<Form />} />
        <Route path="/viewbouquet" element={<Form />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mybouquet" element={<MyBouquet />} />
        <Route path="/share" element={<Share />} />
        <Route path="*" element={<Introduction />} />
      </Routes>
      <Overlay />
    </div>
  );
}

export default function AppRoute() {
  const location = useLocation();

  return (
    <AppStateProvider flowers={flowers} products={products}>
      <App location={location} />
    </AppStateProvider>
  );
}
