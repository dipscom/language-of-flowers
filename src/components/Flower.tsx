import { memo } from "react";
import type { FlowerData } from "../types";
import ParagraphDecoration from "./ParagraphDecoration";

interface FlowerProps {
  details: FlowerData;
  index: string;
}

function Flower({ details, index }: FlowerProps) {
  return (
    <li id={index} className="flower">
      <div>
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
