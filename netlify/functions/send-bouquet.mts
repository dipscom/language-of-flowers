import type { Config } from "@netlify/functions";
import flowers from "../../src/data/flowers";
import { VIEW_BOUQUET_PATH } from "../../src/routes";

const MAX_FLOWERS = 3;
const MAX_NAME_LENGTH = 20;
const MAX_EMAIL_LENGTH = 254;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_RE = /[\u0000-\u001f\u007f]/;

export const config: Config = {
  // Must be a literal: Netlify reads `config` statically, so an imported
  // constant is ignored and the route silently never exists. Keep it in sync
  // with SEND_BOUQUET_ENDPOINT in src/routes.ts.
  path: "/api/send-bouquet",
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};

function json(status: number, body: { ok: boolean; error?: string }) {
  return Response.json(body, { status });
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}

function isName(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= MAX_NAME_LENGTH &&
    !CONTROL_CHARS_RE.test(value)
  );
}

function allowedOrigins() {
  return [
    process.env.URL,
    process.env.CUSTOM_DOMAIN_URL,
    process.env.DEPLOY_PRIME_URL,
  ].filter((origin): origin is string => Boolean(origin));
}

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  // Browsers always send Origin on a POST, so a missing one means a
  // non-browser client.
  const origin = req.headers.get("origin");
  if (!origin || !allowedOrigins().includes(origin)) {
    return json(403, { ok: false, error: "Forbidden" });
  }

  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  const { recipientName, recipientEmail, senderName, bouquet } = data ?? {};

  if (!isName(recipientName) || !isName(senderName)) {
    return json(400, { ok: false, error: "Missing or invalid names" });
  }
  if (
    typeof recipientEmail !== "string" ||
    recipientEmail.length > MAX_EMAIL_LENGTH ||
    !EMAIL_RE.test(recipientEmail)
  ) {
    return json(400, { ok: false, error: "Invalid email address" });
  }
  if (
    !Array.isArray(bouquet) ||
    bouquet.length < 1 ||
    bouquet.length > MAX_FLOWERS ||
    !bouquet.every(
      (key) => typeof key === "string" && Object.hasOwn(flowers, key),
    )
  ) {
    return json(400, { ok: false, error: "Invalid bouquet" });
  }

  const params = new URLSearchParams({
    bouquet: bouquet.join(","),
    sender: senderName,
    recipient: recipientName,
  });
  const link = `${origin}${VIEW_BOUQUET_PATH}?${params}`;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: `Language of Flowers <${process.env.SEND_EMAIL_FROM}>`,
        to: [recipientEmail],
        subject: `${senderName} has sent you a bouquet`,
        html: `<p>${escapeHtml(senderName)} has sent you a bouquet from the Language of Flowers.</p>
               <p><a href="${escapeHtml(link)}">View your bouquet</a></p>`,
        text: `${senderName} has sent you a bouquet from the Language of Flowers.\n\nView your bouquet: ${link}`,
      }),
    });

    if (!resp.ok) {
      console.error("Resend error", resp.status);
      return json(502, { ok: false, error: "Email provider error" });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("send-bouquet failure", err);
    return json(500, { ok: false, error: "Unexpected server error" });
  }
}
