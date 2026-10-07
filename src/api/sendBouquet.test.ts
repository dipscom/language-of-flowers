import { afterEach, describe, expect, it, vi } from "vitest";
import { sendBouquet } from "./sendBouquet";

const details = {
  senderName: "A",
  recipientName: "B",
  recipientEmail: "b@example.com",
};

function respond(body: unknown, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status })),
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("sendBouquet", () => {
  it("posts the details and bouquet", async () => {
    respond({ ok: true });
    expect(await sendBouquet(details, ["jasmine"])).toEqual({ ok: true });
    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("/api/send-bouquet");
    expect(JSON.parse(init!.body as string)).toEqual({
      ...details,
      bouquet: ["jasmine"],
    });
  });

  it("returns the server's error message", async () => {
    respond({ ok: false, error: "Invalid email address" }, 400);
    expect(await sendBouquet(details, ["jasmine"])).toEqual({
      ok: false,
      error: "Invalid email address",
    });
  });

  it("falls back on an unexpected body", async () => {
    respond("nope", 500);
    expect(await sendBouquet(details, ["jasmine"])).toEqual({
      ok: false,
      error: "Something went wrong",
    });
  });

  it("reports network failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("x")));
    expect(await sendBouquet(details, ["jasmine"])).toEqual({
      ok: false,
      error: "Network error",
    });
  });
});
