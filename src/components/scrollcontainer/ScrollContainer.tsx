import { useCallback, useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import styles from "./ScrollContainer.module.css";
import type { ScrollContainerContext } from "./useScrollContainer";

export default function ScrollContainer() {
  const { pathname } = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const resetScroll = useCallback(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    resetScroll();
  }, [pathname, resetScroll]);

  const context: ScrollContainerContext = { resetScroll };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scroller} ref={scrollerRef}>
        <Link className={styles.logo} to="/">
          <img
            className={styles.logoImage}
            src="/images/lof-logo.svg"
            alt="The Language of Flowers"
            title="The Language of Flowers"
          />
        </Link>
        <Outlet context={context} />
      </div>
    </div>
  );
}
