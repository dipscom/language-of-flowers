import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Paper from "../paper/Paper";
import styles from "./ScrollContainer.module.css";
import type { ScrollContainerContext } from "./useScrollContainer";

export default function ScrollContainer() {
  const { pathname } = useLocation();
  const [smallLogo, setSmallLogo] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const resetScroll = useCallback(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    resetScroll();
  }, [pathname, resetScroll]);

  const logoClasses = [styles.logo, smallLogo && styles.smallLogo]
    .filter(Boolean)
    .join(" ");

  const context: ScrollContainerContext = {
    resetScroll,
    setSmallLogo,
  };

  return (
    <div className={styles.scrollContainer}>
      <Paper />
      <div className={styles.scroller} ref={scrollerRef}>
        <Link className={logoClasses} to="/">
          <img
            alt="The Language of Flowers"
            className={styles.logoImage}
            height="133"
            src="/images/lof-logo.svg"
            title="The Language of Flowers"
            width="300"
          />
        </Link>
        <Outlet context={context} />
      </div>
    </div>
  );
}
