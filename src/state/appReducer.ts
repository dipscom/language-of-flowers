import type { AppAction, AppState, FlowersById } from "../types";

export function createInitialState(flowers: FlowersById): AppState {
  return {
    bouquet: [],
    flowers,
    recipient: { name: "", email: "", valid: false },
    sender: { name: "" },
    steps: { current: 1 },
    navigation: { disabled: false },
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SELECT_FLOWER": {
      const index = state.bouquet.indexOf(action.key);
      const flowers = { ...state.flowers };
      if (index === -1) {
        if (state.bouquet.length >= 3) return state;
        flowers[action.key] = { ...flowers[action.key], selected: true };
        return { ...state, bouquet: [...state.bouquet, action.key], flowers };
      }
      flowers[action.key] = { ...flowers[action.key], selected: false };
      return {
        ...state,
        bouquet: [
          ...state.bouquet.slice(0, index),
          ...state.bouquet.slice(index + 1),
        ],
        flowers,
      };
    }
    case "UPDATE_FIELD": {
      if (action.field === "sender") {
        return {
          ...state,
          sender: { ...state.sender, [action.name]: action.value },
        };
      }
      const recipient = {
        ...state.recipient,
        [action.name]: action.value,
      };
      if (action.isEmail) {
        recipient.valid = action.valid ?? false;
      }
      return { ...state, recipient };
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
