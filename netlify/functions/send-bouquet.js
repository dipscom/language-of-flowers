const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  const origin = event.headers.origin || event.headers.referer || "";
  const allowedHost = process.env.URL || process.env.DEPLOY_URL || "";
  if (allowedHost && origin && !origin.startsWith(allowedHost)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ ok: false, error: "Forbidden" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Invalid JSON" }),
    };
  }

  const { recipientName, recipientEmail, senderName, link, bouquetSize } = data;

  if (!recipientName || !recipientEmail || !senderName || !link) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Missing required fields" }),
    };
  }
  if (!EMAIL_RE.test(recipientEmail)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Invalid email address" }),
    };
  }
  if (!bouquetSize || bouquetSize < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Bouquet is empty" }),
    };
  }
  if (!link.startsWith("http")) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: "Invalid link" }),
    };
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Language of Flowers <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `${senderName} has sent you a bouquet`,
        html: `<p>${senderName} has sent you a bouquet from the Language of Flowers.</p>
               <p><a href="${link}">View your bouquet</a></p>`,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Resend error", resp.status, errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ ok: false, error: "Email provider error" }),
      };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("send-bouquet failure", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: "Unexpected server error" }),
    };
  }
};
