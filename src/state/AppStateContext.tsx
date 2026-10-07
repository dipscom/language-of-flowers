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

  const bouquetKeys = state.bouquet;
  const sendBouquet = useCallback(
    async (details: PersonDetailsValues) => {
      const params = new URLSearchParams({
        bouquet: bouquetKeys.join(","),
        sender: details.senderName,
      });
      try {
        const resp = await fetch("/.netlify/functions/send-bouquet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientName: details.recipientName,
            recipientEmail: details.recipientEmail,
            senderName: details.senderName,
            link: `${window.location.origin}/view-bouquet?${params}`,
            bouquetSize: bouquetKeys.length,
          }),
        });
        const result = (await resp.json()) as { ok?: boolean; error?: string };
        return resp.ok && result.ok
          ? null
          : (result.error ?? "Something went wrong");
      } catch {
        return "Network error — please try again";
      }
    },
    [bouquetKeys],
  );

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
    sendBouquet,
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
