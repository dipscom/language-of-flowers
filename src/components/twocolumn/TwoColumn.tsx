import type { ReactNode } from "react";
import styles from "./TwoColumn.module.css";

interface TwoColumnProps {
  children: ReactNode;
}

export default function TwoColumn({ children }: TwoColumnProps) {
  return <div className={styles["two-column"]}>{children}</div>;
}

interface ColumnProps extends TwoColumnProps {
  /** Vertically centre the content from --landscape up. */
  centered?: boolean;
}

export function Column({ children, centered }: ColumnProps) {
  return (
    <div
      className={
        centered ? `${styles.column} ${styles.centered}` : styles.column
      }
    >
      {children}
    </div>
  );
}
