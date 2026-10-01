import type { AppAction, AppState, FlowersById } from "../types";

export function createInitialState(flowers: FlowersById): AppState {
  return {
    bouquet: [],
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
      const bouquet = action.keys.slice(0, 3);
      const flowers = { ...state.flowers };
      for (const key of Object.keys(flowers)) {
        flowers[key] = { ...flowers[key], selected: bouquet.includes(key) };
      }
      return { ...state, bouquet, flowers };
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
