import Button from "../Button";
import ParagraphDecoration from "../ParagraphDecoration";
import type { FlowersById, Navigation } from "../../types";

const MAX_FLOWERS = 3;

interface BouquetBuilderProps {
  bouquet: string[];
  flowers: FlowersById;
  selectFlower: (key: string) => void;
  onHover: (key: string | null) => void;
  nextCta: string;
  nextStep: () => void;
  navigation: Navigation;
}

export default function BouquetBuilder({
  bouquet,
  flowers,
  selectFlower,
  onHover,
  nextCta,
  nextStep,
  navigation,
}: BouquetBuilderProps) {
  return (
    <div id="bouquet-builder">
      <header>
        <h1>Create your bouquet</h1>
        <ParagraphDecoration />
      </header>
      <strong className="sub-heading">Select {MAX_FLOWERS} flowers:</strong>
      <ul id="flower-list">
        {Object.keys(flowers).map((key) => {
          const checked = bouquet.includes(key);
          const disabled = !checked && bouquet.length >= MAX_FLOWERS;
          // Selected and disabled flowers don't preview on hover or focus.
          const preview = () => {
            if (!checked && !disabled) onHover(key);
          };
          const stopPreview = () => onHover(null);
          return (
            <li key={key} className="flower">
              <label onMouseEnter={preview} onMouseLeave={stopPreview}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => selectFlower(key)}
                  onFocus={preview}
                  onBlur={stopPreview}
                />
                {flowers[key].name}
              </label>
            </li>
          );
        })}
      </ul>
      <Button
        className="button"
        cta={nextCta}
        disabled={bouquet.length < MAX_FLOWERS || navigation.disabled}
        step={nextStep}
      />
    </div>
  );
}
