import type { ReactNode } from "react";
import styles from "./TwoColumn.module.css";

interface TwoColumnProps {
  children: ReactNode;
}

export default function TwoColumn({ children }: TwoColumnProps) {
  return <div className={styles["two-column"]}>{children}</div>;
}

export function Column({ children }: TwoColumnProps) {
  return <div className={styles.column}>{children}</div>;
}
