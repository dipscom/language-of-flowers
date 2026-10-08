import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Link,
  UNSAFE_LocationContext as LocationContext,
  useLocation,
  useNavigationType,
  type Location,
} from "react-router";
import { titleForPath } from "../../routes";
import { flipFor } from "../../animation/journey";
import createPageFlip, { type PageFlip } from "../../animation/pageFlip";
import Paper from "../paper/Paper";
import styles from "./ScrollContainer.module.css";

interface Page {
  // Stays the same while the page does, so React keeps its DOM and state
  // while it moves from being the current page to the one leaving.
  id: string;
  location: Location;
}

interface Pages {
  current: Page;
  leaving: Page | null;
}

interface ScrollContainerProps {
  renderPage: (location: Location) => ReactNode;
}

const logo = (alt: string) => (
  <img
    alt={alt}
    className={styles.logoImage}
    height="133"
    src="/images/lof-logo.svg"
    width="300"
  />
);

// The paper with the routed page on it. Navigating to another page turns a
// leaf back over the old one (see animation/pageFlip.ts): the old page stays
// mounted, under the flap, until the flip is done.
export default function ScrollContainer({ renderPage }: ScrollContainerProps) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const [pages, setPages] = useState<Pages>({
    current: { id: location.key, location },
    leaving: null,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const incomingRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip>(null);

  if (location.key !== pages.current.location.key) {
    const { current } = pages;
    const flips =
      location.pathname !== current.location.pathname &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPages(
      flips
        ? {
            current: { id: location.key, location },
            leaving: current,
          }
        : { current: { id: current.id, location }, leaving: null },
    );
  }

  useLayoutEffect(() => {
    const flip = createPageFlip(canvasRef.current!);
    flipRef.current = flip;
    return () => {
      flip.dispose();
      flipRef.current = null;
    };
  }, []);

  // Each page gets its own title, and focus moves to its heading so keyboard
  // and screen reader users land on the new content (the link they used is
  // gone or inert by now). Not on the first load, where the browser starts
  // from the top of the document anyway.
  const currentPath = pages.current.location.pathname;
  const firstPage = useRef(true);
  useEffect(() => {
    document.title = titleForPath(currentPath);
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    const heading = incomingRef.current?.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }, [currentPath]);

  const leavingId = pages.leaving?.id;
  // Going back in the journey turns the page the other way (see journey.ts).
  const kind = pages.leaving
    ? flipFor(pages.leaving.location.pathname, pages.current.location.pathname)
    : null;
  useLayoutEffect(() => {
    if (!leavingId || !kind) return;
    flipRef
      .current!.play(incomingRef.current!, kind, outgoingRef.current)
      .then(() => {
        setPages((latest) =>
          latest.leaving?.id === leavingId
            ? { ...latest, leaving: null }
            : latest,
        );
      });
  }, [leavingId, kind]);

  const renderPageAt = (page: Page, incoming: boolean) => (
    <div
      className={styles.page}
      data-load="content"
      inert={!incoming}
      key={page.id}
      ref={incoming ? incomingRef : outgoingRef}
    >
      <div className={styles.scroller}>
        <div className={`${styles.logo} ${styles.logoStatic}`}>
          {logo("The Language of Flowers")}
        </div>
        <Link className={`${styles.logo} ${styles.logoLink}`} to="/">
          {logo("The Language of Flowers: back to the beginning")}
        </Link>
        {/* The leaving page keeps seeing its own location, not the new one. */}
        <LocationContext.Provider
          value={{ location: page.location, navigationType }}
        >
          {renderPage(page.location)}
        </LocationContext.Provider>
      </div>
    </div>
  );

  return (
    <div className={styles["scroll-container"]}>
      <Paper />
      {pages.leaving && renderPageAt(pages.leaving, false)}
      {renderPageAt(pages.current, true)}
      <canvas
        aria-hidden="true"
        className={styles.flip}
        data-load="flip"
        ref={canvasRef}
      />
    </div>
  );
}
