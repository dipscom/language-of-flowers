import { memo } from "react";
import type { FlowerData } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface FlowerProps {
  bouquetLength?: number;
  details: FlowerData;
  index: string;
  selectFlower?: (key: string) => void;
  updateActiveFlower?: (key: string) => void;
}

function Flower({
  bouquetLength,
  details,
  index,
  selectFlower,
  updateActiveFlower,
}: FlowerProps) {
  let classes = "";
  if (details.selected) {
    classes += "checked";
  } else if (bouquetLength !== undefined && bouquetLength >= 3 && !details.selected) {
    classes += "disabled";
  }
  return (
    <li id={index} className="flower">
      <div
        className={classes}
        onClick={
          selectFlower
            ? () => {
                selectFlower(index);
              }
            : undefined
        }
        onMouseOver={
          updateActiveFlower
            ? () => {
                updateActiveFlower(index);
              }
            : undefined
        }
      >
        <figure
          style={{ backgroundImage: "url(/images/flowers/" + index + ".png)" }}
        >
          <div></div>
        </figure>
        <div className="flower-details">
          <h1 className="word">{details.name}</h1>
          <ParagraphDecoration />
          <strong className="sub-heading word">Meaning</strong>
          <div>
            <p className="word">{details.meaning}</p>
            <p className="word">{details.description}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default memo(Flower);
