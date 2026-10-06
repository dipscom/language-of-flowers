import { useRef, useState } from "react";
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
import Details from "./details/Details";
import ViewBouquet from "./viewbouquet/ViewBouquet";
import Success from "./success/Success";
import { AppStateProvider } from "../state/AppStateContext";

gsap.registerPlugin(useGSAP);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);

  // Initial-load animation only: this runs once when `App` first mounts
  // (i.e. on a hard page load) and never again, since `App` stays mounted
  // for the lifetime of the SPA session — client-side navigation only ever
  // swaps the routed page content below, it doesn't remount this component.
  useGSAP(
    (_context, contextSafe) =>
      initialLoad({
        scope: containerRef.current!,
        flowerKeys: Object.keys(flowers),
        onReady: () => setReady(true),
        contextSafe: contextSafe!,
      }),
    { scope: containerRef, dependencies: [] },
  );

  return (
    <main id="container" ref={containerRef}>
      {!ready && (
        <p className="loader" role="status">
          Loading<span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      )}
      <Background />
      <ScrollContainer
        renderPage={(location) => (
          <Routes location={location}>
            <Route path="/" element={<Introduction />} />
            <Route path="/build-bouquet" element={<BuildBouquet />} />
            <Route path="/details" element={<Details />} />
            <Route path="/view-bouquet" element={<ViewBouquet />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<Introduction />} />
          </Routes>
        )}
      />
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
