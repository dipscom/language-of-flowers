import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isContentRevealed } from "../animation/contentReveal";
import createParagraphDecorationReveal, {
  paragraphDecorationDelay,
} from "../animation/paragraphDecoration";
import styles from "./ParagraphDecoration.module.css";

interface ParagraphDecorationProps {
  reflected?: boolean;
}

export default function ParagraphDecoration({
  reflected,
}: ParagraphDecorationProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Starts hidden. During the initial load its reveal is part of that
  // animation's timeline (see initialLoad.ts); mounted later, it plays itself.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const element = ref.current!;
      const reveal = createParagraphDecorationReveal(element);
      reveal.hide();
      if (isContentRevealed()) {
        gsap
          .timeline({ delay: paragraphDecorationDelay(element) })
          .add(reveal.play());
      }
    },
    { scope: ref },
  );

  return (
    <div
      className={
        reflected
          ? `${styles["paragraph-decoration"]} ${styles.reflected}`
          : styles["paragraph-decoration"]
      }
      data-load="decoration"
      data-reflected={reflected ? "" : undefined}
      ref={ref}
    >
      <div className={styles.left} data-side="left"></div>
      <div className={styles.right} data-side="right"></div>
      <div className={styles.left} data-side="left"></div>
      <div className={styles.right} data-side="right"></div>
    </div>
  );
}
