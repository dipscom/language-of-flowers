import type { AppAction, AppState, FlowersById } from "../types";

const MAX_FLOWERS = 3;

export function createInitialState(flowers: FlowersById): AppState {
  return {
    bouquet: [],
    slots: Array<string>(MAX_FLOWERS).fill(""),
    freeSlots: Array.from({ length: MAX_FLOWERS }, (_, i) => i),
    flowers,
    recipient: { name: "", email: "" },
    sender: { name: "" },
    steps: { current: 1 },
    navigation: { disabled: false },
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
    case "NEXT_STEP":
      return {
        ...state,
        steps: { ...state.steps, current: state.steps.current + 1 },
        navigation: { disabled: true },
      };
    case "PREV_STEP":
      return {
        ...state,
        steps: { ...state.steps, current: state.steps.current - 1 },
        navigation: { disabled: true },
      };
    case "ENABLE_BUTTON":
      return { ...state, navigation: { disabled: false } };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
}
