import { useContext } from "react";
import AppStateContext from "./appStateContext";
import type { AppContextValue } from "../types";

export function useAppState(): AppContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return ctx;
}
