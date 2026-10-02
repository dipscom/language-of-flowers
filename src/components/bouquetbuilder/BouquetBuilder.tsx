import type { FlowersById, Navigation } from "../../types";
import form from "../BuildForm.module.css";
import styles from "./BouquetBuilder.module.css";

const MAX_FLOWERS = 3;

interface BouquetBuilderProps {
  bouquet: string[];
  flowers: FlowersById;
  selectFlowers: (keys: string[]) => void;
  onHover: (key: string | null) => void;
  nextStep: () => void;
  navigation: Navigation;
}

export default function BouquetBuilder({
  bouquet,
  flowers,
  selectFlowers,
  onHover,
  nextStep,
  navigation,
}: BouquetBuilderProps) {
  return (
    <form
      id="bouquet-builder"
      className={form.form}
      action={nextStep}
      onChange={(e) =>
        selectFlowers(
          new FormData(e.currentTarget).getAll("flowers") as string[],
        )
      }
    >
      <p className={form["sub-heading"]}>Select {MAX_FLOWERS} flowers:</p>
      <ul id="flower-list" className={styles.flowerList}>
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
              <input
                id={"flower-" + key}
                className={styles.checkbox}
                type="checkbox"
                name="flowers"
                value={key}
                defaultChecked={checked}
                disabled={disabled}
                onFocus={preview}
                onBlur={stopPreview}
              />
              <label
                htmlFor={"flower-" + key}
                className={styles.card}
                onMouseEnter={preview}
                onMouseLeave={stopPreview}
              >
                <img
                  className={styles.thumbnail}
                  src={"/images/flowers/" + key + ".png"}
                  alt=""
                />
                <div className={styles.text}>
                  <p className={styles.name}>{flowers[key].name}</p>
                  <p className={styles.meaning}>{flowers[key].meaning}</p>
                  <p className={styles.description}>
                    {flowers[key].description}
                  </p>
                </div>
              </label>
            </li>
          );
        })}
      </ul>
      <button
        className="button"
        disabled={bouquet.length < MAX_FLOWERS || navigation.disabled}
      >
        Delivery details
      </button>
    </form>
  );
}
