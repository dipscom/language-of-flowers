import { useRef } from "react";
import { Routes, Route } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import initialLoad from "../animation/initialLoad";
import flowers from "../data/flowers";
import Background from "./background/Background";
import Overlay from "./overlay/Overlay";
import ScrollContainer from "./scrollcontainer/ScrollContainer";
import Introduction from "./introduction/Introduction";
import BuildBouquet from "./buildbouquet/BuildBouquet";
import ViewBouquet from "./viewbouquet/ViewBouquet";
import Confirmation from "./Confirmation";
import Success from "./Success";
import { AppStateProvider } from "../state/AppStateContext";

gsap.registerPlugin(useGSAP);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial-load animation only: this runs once when `App` first mounts
  // (i.e. on a hard page load) and never again, since `App` stays mounted
  // for the lifetime of the SPA session — client-side navigation only ever
  // swaps the routed page content below, it doesn't remount this component.
  useGSAP(initialLoad, { scope: containerRef, dependencies: [] });

  return (
    <main id="container" ref={containerRef}>
      <Background />
      <Routes>
        <Route element={<ScrollContainer />}>
          <Route path="/" element={<Introduction />} />
          <Route path="/build-bouquet" element={<BuildBouquet />} />
          <Route path="/view-bouquet" element={<ViewBouquet />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<Introduction />} />
        </Route>
      </Routes>
      <Overlay />
    </main>
  );
}

export default function AppRoute() {
  return (
    <AppStateProvider flowers={flowers}>
      <App />
    </AppStateProvider>
  );
}
