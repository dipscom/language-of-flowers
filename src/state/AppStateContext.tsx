import { useCallback, useReducer, type ReactNode } from "react";
import { appReducer, createInitialState } from "./appReducer";
import AppStateContext from "./appStateContext";
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
    createInitialState(flowers),
  );

  const mailChimp = useCallback(() => {}, []);

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
    mailChimp,
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
