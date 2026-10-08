import { describe, expect, it } from "vitest";
import { joinMeanings } from "./bouquetMessage";
import flowers from "./data/flowers";

describe("joinMeanings", () => {
  it("joins meanings into a sentence fragment", () => {
    expect(joinMeanings(["rose", "jasmine", "white-iris"], flowers)).toBe(
      "gratitude, grace and wisdom",
    );
  });

  it("mentions a repeated flower's meaning once", () => {
    expect(joinMeanings(["rose", "rose", "rose"], flowers)).toBe("gratitude");
  });

  it("lowercases multi-word meanings", () => {
    expect(joinMeanings(["lily-valley", "rose"], flowers)).toBe(
      "the return of happiness and gratitude",
    );
  });
});
