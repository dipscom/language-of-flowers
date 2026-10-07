import {
  useCallback,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { appReducer, createInitialState } from "./appReducer";
import AppStateContext from "./appStateContext";
import {
  clearPersistedState,
  loadPersistedState,
  persistState,
} from "./sessionStorage";
import type {
  AppContextValue,
  FlowersById,
  PersonDetailsValues,
} from "../types";

interface AppStateProviderProps {
  flowers: FlowersById;
  children: ReactNode;
}

export function AppStateProvider({ flowers, children }: AppStateProviderProps) {
  const [state, dispatch] = useReducer(appReducer, undefined, () =>
    loadPersistedState(flowers),
  );
  // Kept apart from the reducer state, and out of session storage, so that a
  // reload forgets it and /success sends the user back to the start.
  const [sentBouquet, setSentBouquet] = useState<string[]>([]);

  useEffect(() => persistState(state), [state]);

  const markSent = useCallback((bouquet: string[]) => {
    // Clearing here, rather than waiting for the reducer state to be reset,
    // so nothing sent stays in storage while the page is still being turned.
    clearPersistedState();
    setSentBouquet(bouquet);
  }, []);

  const selectFlowers = useCallback((keys: string[]) => {
    dispatch({ type: "SET_BOUQUET", keys });
  }, []);

  const savePersonDetails = useCallback((details: PersonDetailsValues) => {
    dispatch({ type: "SAVE_PERSON_DETAILS", details });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET", initialState: createInitialState(flowers) });
  }, [flowers]);

  const value: AppContextValue = {
    ...state,
    sentBouquet,
    markSent,
    selectFlowers,
    savePersonDetails,
    reset,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
