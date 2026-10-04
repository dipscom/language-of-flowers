import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import styles from "./TwoColumn.module.css";

interface TwoColumnProps {
  children: ReactNode;
}

interface TwoColumnLayoutProps extends TwoColumnProps {
  // Scrolls everything holding this content back to the top when it changes.
  scrollKey?: unknown;
}

export default function TwoColumn({
  children,
  scrollKey,
}: TwoColumnLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Below --landscape the page scroller (an ancestor) scrolls; from
  // --landscape up the columns and their forms do. Reset whichever has moved.
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    for (const scrolled of element.querySelectorAll("*")) {
      if (scrolled.scrollTop) scrolled.scrollTop = 0;
    }
    for (
      let ancestor = element.parentElement;
      ancestor;
      ancestor = ancestor.parentElement
    ) {
      if (ancestor.scrollTop) ancestor.scrollTop = 0;
    }
  }, [scrollKey]);

  return (
    <div className={styles["two-column"]} ref={ref}>
      {children}
    </div>
  );
}

export function Column({ children }: TwoColumnProps) {
  return <div className={styles.column}>{children}</div>;
}
