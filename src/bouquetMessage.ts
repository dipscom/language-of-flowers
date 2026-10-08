import type { FlowersById } from "./types";

const list = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
});

// "Constancy", "Return of Happiness." -> "constancy and return of happiness".
// Repeated flowers speak once.
export function joinMeanings(bouquet: string[], flowers: FlowersById) {
  const meanings = new Set(
    bouquet.map((key) => flowers[key].meaning.replace(/\.$/, "").toLowerCase()),
  );
  return list.format(meanings);
}

export function joinNames(bouquet: string[], flowers: FlowersById) {
  const names = new Set(bouquet.map((key) => flowers[key].name));
  return list.format(names);
}
