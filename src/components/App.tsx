import { useRef } from "react";
import { Routes, Route, useLocation, type Location } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import initialLoad from "../animation/initialLoad";
import flowers from "../data/flowers";
import Background from "./Background";
import Overlay from "./Overlay";
import Introduction from "./introduction/Introduction";
import Description from "./Description";
import Form from "./Form";
import Confirmation from "./Confirmation";
import Success from "./Success";
import MyBouquet from "./MyBouquet";
import { AppStateProvider } from "../state/AppStateContext";

gsap.registerPlugin(useGSAP);

interface AppProps {
  location: Location;
}

function App({ location }: AppProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial-load animation only: this runs once when `App` first mounts
  // (i.e. on a hard page load) and never again, since `App` stays mounted
  // for the lifetime of the SPA session — client-side navigation only ever
  // swaps the routed page content below, it doesn't remount this component.
  useGSAP(initialLoad, { scope: containerRef, dependencies: [] });

  return (
    <div id="container" ref={containerRef}>
      <Background location={location} />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/description" element={<Description />} />
        <Route path="/buildbouquet" element={<Form />} />
        <Route path="/viewbouquet" element={<Form />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/success" element={<Success />} />
        <Route path="/mybouquet" element={<MyBouquet />} />
        <Route path="*" element={<Introduction />} />
      </Routes>
      <Overlay />
    </div>
  );
}

export default function AppRoute() {
  const location = useLocation();

  return (
    <AppStateProvider flowers={flowers}>
      <App location={location} />
    </AppStateProvider>
  );
}
