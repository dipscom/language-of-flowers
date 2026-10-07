import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import initialLoad from "../animation/initialLoad";
import {
  createOverlayPieces,
  type OverlayPieces,
} from "../animation/overlayReveal";
import flowers from "../data/flowers";
import Background from "./background/Background";
import Overlay from "./overlay/Overlay";
import ScrollContainer from "./scrollcontainer/ScrollContainer";
import Introduction from "./introduction/Introduction";
import BuildBouquet from "./buildbouquet/BuildBouquet";
import Details from "./details/Details";
import ViewBouquet from "./viewbouquet/ViewBouquet";
import Success from "./success/Success";
import {
  BUILD_BOUQUET_PATH,
  DETAILS_PATH,
  INTRODUCTION_PATH,
  SUCCESS_PATH,
  VIEW_BOUQUET_PATH,
  isIntroductionPath,
} from "../routes";
import { AppStateProvider } from "../state/AppStateContext";

gsap.registerPlugin(useGSAP);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);

  // The pieces in the overlay belong to the Introduction only.
  const onIntroduction = isIntroductionPath(useLocation().pathname);
  const onIntroductionRef = useRef(onIntroduction);
  const piecesRef = useRef<OverlayPieces>(null);

  // Initial-load animation only: this runs once when `App` first mounts
  // (i.e. on a hard page load) and never again, since `App` stays mounted
  // for the lifetime of the SPA session — client-side navigation only ever
  // swaps the routed page content below, it doesn't remount this component.
  useGSAP(
    (_context, contextSafe) => {
      const pieces = createOverlayPieces(containerRef.current!);
      piecesRef.current = pieces;
      return initialLoad({
        scope: containerRef.current!,
        flowerKeys: Object.keys(flowers),
        onReady: () => setReady(true),
        pieces,
        isIntroduction: () => onIntroductionRef.current,
        contextSafe: contextSafe!,
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  // Brings the pieces in or out as the route changes; the first render
  // is left to the initial load.
  useEffect(() => {
    if (onIntroductionRef.current === onIntroduction) return;
    onIntroductionRef.current = onIntroduction;
    const pieces = piecesRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pieces.set(onIntroduction);
    } else if (onIntroduction) {
      pieces.show();
    } else {
      pieces.hide();
    }
  }, [onIntroduction]);

  return (
    <main id="container" ref={containerRef}>
      {!ready && (
        <div className="loader" role="status" data-load="loader">
          <img
            src="/images/penny-farthing-64.gif"
            width={64}
            height={64}
            alt="Loading"
          />
        </div>
      )}
      <Background />
      <ScrollContainer
        renderPage={(location) => (
          <Routes location={location}>
            <Route path={INTRODUCTION_PATH} element={<Introduction />} />
            <Route path={BUILD_BOUQUET_PATH} element={<BuildBouquet />} />
            <Route path={DETAILS_PATH} element={<Details />} />
            <Route path={VIEW_BOUQUET_PATH} element={<ViewBouquet />} />
            <Route path={SUCCESS_PATH} element={<Success />} />
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
