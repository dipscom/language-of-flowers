import { memo } from "react";

function Flower({
  bouquetLength,
  details,
  index,
  selectFlower,
  updateActiveFlower,
}) {
  let classes = "";
  if (details.selected) {
    classes += "checked";
  } else if (bouquetLength >= 3 && !details.selected) {
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
          <hr />
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
