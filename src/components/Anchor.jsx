import { Link } from "react-router";

export default function Anchor({ className, step, target, click, cta }) {
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
