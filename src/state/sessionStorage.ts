import { createInitialState, MAX_FLOWERS } from "./appReducer";
import type { AppState, FlowersById } from "../types";

const STORAGE_KEY = "language-of-flowers:journey";

type PersistedState = Pick<
  AppState,
  "slots" | "freeSlots" | "recipient" | "sender"
>;

const isString = (value: unknown): value is string => typeof value === "string";

function isPersistedState(
  value: unknown,
  flowers: FlowersById,
): value is PersistedState {
  if (typeof value !== "object" || value === null) return false;
  const { slots, freeSlots, recipient, sender } = value as Record<
    string,
    Record<string, unknown> & unknown[]
  >;
  return (
    Array.isArray(slots) &&
    slots.length === MAX_FLOWERS &&
    slots.every((key) => key === "" || (isString(key) && key in flowers)) &&
    Array.isArray(freeSlots) &&
    freeSlots.every(
      (i) =>
        typeof i === "number" &&
        Number.isInteger(i) &&
        i >= 0 &&
        i < MAX_FLOWERS,
    ) &&
    isString(recipient?.name) &&
    isString(recipient?.email) &&
    isString(sender?.name)
  );
}

// Storage access can throw (blocked site data, private windows), and the
// journey works fine without it, so every failure is swallowed.
export function loadPersistedState(flowers: FlowersById): AppState {
  const initial = createInitialState(flowers);
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const persisted: unknown = JSON.parse(raw);
    if (!isPersistedState(persisted, flowers)) return initial;

    const bouquet = persisted.slots.filter(Boolean);
    const selected: FlowersById = {};
    for (const [key, flower] of Object.entries(flowers)) {
      selected[key] = { ...flower, selected: bouquet.includes(key) };
    }
    return {
      ...initial,
      bouquet,
      slots: persisted.slots,
      freeSlots: persisted.freeSlots,
      flowers: selected,
      recipient: persisted.recipient,
      sender: persisted.sender,
    };
  } catch {
    return initial;
  }
}

export function persistState(state: AppState) {
  try {
    const pristine =
      state.bouquet.length === 0 &&
      !state.sender.name &&
      !state.recipient.name &&
      !state.recipient.email;
    if (pristine) {
      sessionStorage.removeItem(STORAGE_KEY);
      return;
    }
    const { slots, freeSlots, recipient, sender } = state;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ slots, freeSlots, recipient, sender }),
    );
  } catch {
    // Persistence is a convenience only.
  }
}

export function clearPersistedState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear if storage is unavailable.
  }
}
