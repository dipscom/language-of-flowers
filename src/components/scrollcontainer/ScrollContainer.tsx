import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import styles from "./ScrollContainer.module.css";
import type { ScrollContainerContext } from "./useScrollContainer";

export default function ScrollContainer() {
  const { pathname } = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [footer, setFooter] = useState<HTMLDivElement | null>(null);

  const resetScroll = useCallback(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    resetScroll();
  }, [pathname, resetScroll]);

  // The logo is hidden on the introduction, so it needs less room above it.
  const scrollerClasses =
    styles.scroller + (pathname === "/" ? " " + styles.noLogo : "");
  const context: ScrollContainerContext = { resetScroll, footer };

  return (
    <div className={styles.scrollContainer}>
      <div className={scrollerClasses} ref={scrollerRef}>
        <Outlet context={context} />
      </div>
      <div ref={setFooter}></div>
    </div>
  );
}
