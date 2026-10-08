import { SEND_BOUQUET_ENDPOINT } from "../routes";
import type { PersonDetailsValues } from "../types";

type SendResult = { ok: true } | { ok: false; error: string };

interface ResponseBody {
  ok: boolean;
  error?: string;
}

function isResponseBody(value: unknown): value is ResponseBody {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { ok?: unknown }).ok === "boolean"
  );
}

// Asks the Netlify function to email the recipient a link to the bouquet.
export async function sendBouquet(
  details: PersonDetailsValues,
  bouquet: string[],
  signal?: AbortSignal,
): Promise<SendResult> {
  try {
    const resp = await fetch(SEND_BOUQUET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...details, bouquet }),
      signal,
    });
    const body: unknown = await resp.json();
    if (resp.ok && isResponseBody(body) && body.ok) return { ok: true };
    return {
      ok: false,
      error: (isResponseBody(body) && body.error) || "The message has gone astray",
    };
  } catch {
    return { ok: false, error: "The telegraph lines are down" };
  }
}
