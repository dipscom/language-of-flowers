import type { MouseEventHandler } from "react";
import { Link } from "react-router";

interface AnchorProps {
  className?: string;
  step?: "forward" | "backward";
  target: string;
  click?: MouseEventHandler<HTMLAnchorElement>;
  cta: string;
}

export default function Anchor({
  className,
  step,
  target,
  click,
  cta,
}: AnchorProps) {
  let classes = className ? className : "";
  if (step === "forward") {
    classes += " button";
  } else if (step === "backward") {
    classes += " back-button";
  }
  return (
    <Link className={classes} to={"/" + target} onClick={click}>
      {cta}
    </Link>
  );
}
