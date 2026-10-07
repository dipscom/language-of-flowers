import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { appReducer, createInitialState } from "./appReducer";
import {
  clearPersistedState,
  loadPersistedState,
  persistState,
} from "./sessionStorage";
import type { FlowersById } from "../types";

const flower = { name: "", description: "", meaning: "", selected: false };
const flowers: FlowersById = {
  a: { ...flower },
  b: { ...flower },
  c: { ...flower },
};

function stubStorage() {
  const store = new Map<string, string>();
  vi.stubGlobal("sessionStorage", {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  });
  return store;
}

let store: Map<string, string>;
beforeEach(() => {
  store = stubStorage();
});
afterEach(() => vi.unstubAllGlobals());

describe("session storage", () => {
  it("round-trips the journey state", () => {
    let state = appReducer(createInitialState(flowers), {
      type: "SET_BOUQUET",
      keys: ["b", "c"],
    });
    state = appReducer(state, {
      type: "SAVE_PERSON_DETAILS",
      details: { senderName: "S", recipientName: "R", recipientEmail: "r@x.y" },
    });
    persistState(state);
    expect(loadPersistedState(flowers)).toEqual(state);
  });

  it("falls back to the initial state on corrupt or invalid data", () => {
    const initial = createInitialState(flowers);
    store.set("language-of-flowers:journey", "{nope");
    expect(loadPersistedState(flowers)).toEqual(initial);
    store.set(
      "language-of-flowers:journey",
      JSON.stringify({
        slots: ["zzz", "", ""],
        freeSlots: [],
        recipient: {},
        sender: {},
      }),
    );
    expect(loadPersistedState(flowers)).toEqual(initial);
  });

  it("removes the entry for a pristine state and on clear", () => {
    const withFlower = appReducer(createInitialState(flowers), {
      type: "SET_BOUQUET",
      keys: ["a"],
    });
    persistState(withFlower);
    expect(store.size).toBe(1);
    persistState(createInitialState(flowers));
    expect(store.size).toBe(0);
    persistState(withFlower);
    clearPersistedState();
    expect(store.size).toBe(0);
  });
});
