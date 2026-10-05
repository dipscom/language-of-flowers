import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Paper from "../paper/Paper";
import styles from "./ScrollContainer.module.css";

export default function ScrollContainer() {
  const { pathname } = useLocation();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0;
  }, [pathname]);

  const logo = (
    <img
      alt="The Language of Flowers"
      className={styles.logoImage}
      height="133"
      src="/images/lof-logo.svg"
      title="The Language of Flowers"
      width="300"
    />
  );

  return (
    <div className={styles["scroll-container"]}>
      <Paper />
      <div className={styles.scroller} ref={scrollerRef}>
        <div className={`${styles.logo} ${styles.logoStatic}`}>{logo}</div>
        <Link className={`${styles.logo} ${styles.logoLink}`} to="/">
          {logo}
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
