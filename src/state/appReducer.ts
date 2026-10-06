import type { AppAction, AppState, FlowersById } from "../types";

export const MAX_FLOWERS = 3;

function defaultFreeSlots() {
  return Array.from({ length: MAX_FLOWERS }, (_, i) => i);
}

export function createInitialState(flowers: FlowersById): AppState {
  return {
    bouquet: [],
    slots: Array<string>(MAX_FLOWERS).fill(""),
    freeSlots: defaultFreeSlots(),
    flowers,
    recipient: { name: "", email: "" },
    sender: { name: "" },
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_BOUQUET": {
      const keys = action.keys.slice(0, MAX_FLOWERS);
      const slots = [...state.slots];
      const freeSlots = [...state.freeSlots];
      // Deselected flowers vacate their slot, queued in the order vacated.
      slots.forEach((key, i) => {
        if (key && !keys.includes(key)) {
          slots[i] = "";
          freeSlots.push(i);
        }
      });
      // Newly selected flowers take the earliest vacated slot.
      for (const key of keys) {
        if (slots.includes(key)) continue;
        const slot = freeSlots.shift();
        if (slot !== undefined) slots[slot] = key;
      }
      const bouquet = slots.filter(Boolean);
      // With nothing selected, the slots go back to their default order.
      if (bouquet.length === 0) {
        freeSlots.splice(0, freeSlots.length, ...defaultFreeSlots());
      }
      const flowers = { ...state.flowers };
      for (const key of Object.keys(flowers)) {
        flowers[key] = { ...flowers[key], selected: bouquet.includes(key) };
      }
      return { ...state, bouquet, slots, freeSlots, flowers };
    }
    case "SAVE_PERSON_DETAILS": {
      const { senderName, recipientName, recipientEmail } = action.details;
      return {
        ...state,
        sender: { name: senderName },
        recipient: { name: recipientName, email: recipientEmail },
      };
    }
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}
