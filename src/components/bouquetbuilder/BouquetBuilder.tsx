import type { FlowersById, Navigation } from "../../types";

const MAX_FLOWERS = 3;

interface BouquetBuilderProps {
  bouquet: string[];
  flowers: FlowersById;
  selectFlowers: (keys: string[]) => void;
  onHover: (key: string | null) => void;
  nextCta: string;
  nextStep: () => void;
  navigation: Navigation;
}

export default function BouquetBuilder({
  bouquet,
  flowers,
  selectFlowers,
  onHover,
  nextCta,
  nextStep,
  navigation,
}: BouquetBuilderProps) {
  return (
    <form
      id="bouquet-builder"
      action={nextStep}
      onChange={(e) =>
        selectFlowers(
          new FormData(e.currentTarget).getAll("flowers") as string[],
        )
      }
    >
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
                  name="flowers"
                  value={key}
                  defaultChecked={checked}
                  disabled={disabled}
                  onFocus={preview}
                  onBlur={stopPreview}
                />
                {flowers[key].name}
              </label>
            </li>
          );
        })}
      </ul>
      <button
        className="button"
        disabled={bouquet.length < MAX_FLOWERS || navigation.disabled}
      >
        {nextCta}
      </button>
    </form>
  );
}
