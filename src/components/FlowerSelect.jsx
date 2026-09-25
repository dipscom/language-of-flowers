import { useEffect } from "react";
import Flower from "./Flower";
import ResetScroller from "../animation/ResetScroller";

export default function FlowerSelect({
  bouquet,
  flowers,
  selectFlower,
  updateActiveFlower,
  enableButton,
}) {
  useEffect(() => {
    ResetScroller("form");
    if (enableButton) {
      enableButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="flower-select">
      <header>
        <h1>Create your bouquet</h1>
        <hr />
      </header>
      <strong className="sub-heading">Select 3 flowers:</strong>
      <ul id="flower-list">
        {Object.keys(flowers).map((key) => (
          <Flower
            key={key}
            index={key}
            bouquetLength={bouquet.length}
            details={flowers[key]}
            selectFlower={selectFlower}
            updateActiveFlower={updateActiveFlower}
          />
        ))}
      </ul>
      <ol className="bouquet-list">
        {bouquet.map((key) => (
          <Flower key={key} index={key} details={flowers[key]} />
        ))}
      </ol>
    </div>
  );
}
