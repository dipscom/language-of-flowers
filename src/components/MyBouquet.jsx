import { useEffect } from "react";
import Anchor from "./Anchor";
import ResetScroller from "../animation/ResetScroller";
import { useAppState } from "../state/AppStateContext";

export default function MyBouquet() {
  const { recipient, sender } = useAppState();

  useEffect(() => {
    ResetScroller("my-bouquet");
  }, []);

  return (
    <div id="my-bouquet" key="my-bouquet" className="page">
      <div>
        <div>
          <header>
            <h1>
              Dear <span>{recipient.name}...</span>
            </h1>
            <hr />
          </header>

          <p>
            <strong>
              What could be more elegant than a bouquet of flowers!
            </strong>
          </p>
          <p>A message that speaks a 1000 as yet unknown words...</p>
          <p>
            <strong>
              Find out <span>{sender.name}'s</span> innermost feelings for you.
            </strong>
          </p>
          <nav className="navigation">
            <Anchor
              cta="Decode your bouquet"
              step="forward"
              target="viewbouquet"
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
