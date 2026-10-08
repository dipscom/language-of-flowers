import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../functions/send-bouquet.mjs";

const ORIGIN = "https://example.test";
const valid = {
  recipientName: "Darling",
  recipientEmail: "darling@example.com",
  senderName: "Yours Truly",
  bouquet: ["bluebell", "jasmine", "lavender"],
};

function post(body: unknown, origin: string | null = ORIGIN) {
  return new Request(`${ORIGIN}/api/send-bouquet`, {
    method: "POST",
    headers: origin ? { origin } : {},
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("send-bouquet", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubEnv("URL", ORIGIN);
    vi.stubEnv("RESEND_API_KEY", "key");
    vi.stubEnv("SEND_EMAIL_FROM", "no-reply@example.test");
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    fetchMock.mockReset();
  });

  it("rejects non-POST requests", async () => {
    const res = await handler(new Request(ORIGIN, { method: "GET" }));
    expect(res.status).toBe(405);
  });

  it("rejects a missing or foreign origin", async () => {
    expect((await handler(post(valid, null))).status).toBe(403);
    expect((await handler(post(valid, "https://evil.test"))).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    ["invalid JSON", "{nope"],
    ["empty sender", { ...valid, senderName: " " }],
    ["long name", { ...valid, recipientName: "x".repeat(21) }],
    ["zero-width character", { ...valid, senderName: "Ro\u200bse" }],
    ["bidi control", { ...valid, senderName: "\u202eevil" }],
    ["link in a name", { ...valid, senderName: "pay x.co/abc" }],
    ["bad email", { ...valid, recipientEmail: "nope" }],
    ["empty bouquet", { ...valid, bouquet: [] }],
    ["too many flowers", { ...valid, bouquet: Array(4).fill("jasmine") }],
    ["unknown flower", { ...valid, bouquet: ["nope"] }],
    ["prototype key", { ...valid, bouquet: ["constructor"] }],
  ])("returns 400 for %s", async (_label, body) => {
    expect((await handler(post(body))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("emails a server-built link and escapes the sender", async () => {
    const res = await handler(
      post({ ...valid, senderName: '<b>"x"', bouquet: ["jasmine", "jasmine"] }),
    );
    expect(res.status).toBe(200);
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.html).not.toContain("<b>");
    expect(sent.html).toContain("&lt;b&gt;");
    expect(sent.text).toContain(
      `${ORIGIN}/view-bouquet?bouquet=jasmine%2Cjasmine&sender=`,
    );
    expect(sent.text).toContain("&recipient=Darling");
  });

  it("rejects the default function URL and cross-site fetches", async () => {
    const direct = new Request(`${ORIGIN}/.netlify/functions/send-bouquet`, {
      method: "POST",
      headers: { origin: ORIGIN },
      body: JSON.stringify(valid),
    });
    expect((await handler(direct)).status).toBe(404);
    const crossSite = new Request(`${ORIGIN}/api/send-bouquet`, {
      method: "POST",
      headers: { origin: ORIGIN, "sec-fetch-site": "cross-site" },
      body: JSON.stringify(valid),
    });
    expect((await handler(crossSite)).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("maps a provider failure to 502", async () => {
    fetchMock.mockResolvedValue(new Response("boom", { status: 500 }));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await handler(post(valid))).status).toBe(502);
  });
});
