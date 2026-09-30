import Anchor from "./Anchor";
import { useAppState } from "../state/useAppState";
import ParagraphDecoration from "./ParagraphDecoration";

export default function MyBouquet() {
  const { recipient, sender } = useAppState();

  return (
    <div>
      <header>
        <h1>
          Dear <span>{recipient.name}...</span>
        </h1>
        <ParagraphDecoration />
      </header>

      <p>
        <strong>
          What could be more elegant than a bouquet of flowers!
        </strong>
      </p>
      <p>A message that speaks a 1000 as yet unknown words...</p>
      <p>
        <strong>
          Find out <span>{sender.name}&rsquo;s</span> innermost feelings for you.
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
  );
}
