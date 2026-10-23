// Newsletter signup proxy: the landing page posts here, and this function
// forwards the email to Beehiiv so the API key never reaches the browser.
//
// Required environment variables (Netlify > Site configuration > Environment variables):
//   BEEHIIV_API_KEY          Beehiiv API key (Settings > API)
//   BEEHIIV_PUBLICATION_ID   Publication ID, starts with "pub_"
// Optional:
//   ALLOWED_ORIGINS          Comma-separated origins allowed to post,
//                            e.g. "https://matchadev.com,https://www.matchadev.com"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function readFields(req) {
  const type = req.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    return await req.json();
  }
  const form = await req.formData();
  return Object.fromEntries(form.entries());
}

export default async (req) => {
  if (req.method !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  // Only accept browser posts from our own site when ALLOWED_ORIGINS is set.
  // This stops other websites using the form; it is not protection against scripts.
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const origin = req.headers.get("origin");
  if (allowed.length && origin && !allowed.includes(origin)) {
    return json(403, { ok: false, error: "Origin not allowed" });
  }

  let fields;
  try {
    fields = await readFields(req);
  } catch {
    return json(400, { ok: false, error: "Invalid request" });
  }

  // Honeypot: real visitors never see or fill the "company" field.
  if (fields.company) {
    return json(200, { ok: true });
  }

  const email = String(fields.email || "").trim().toLowerCase();
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return json(422, { ok: false, error: "Please enter a valid email address." });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) {
    console.error("Beehiiv is not configured: missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID");
    return json(500, { ok: false, error: "Signup is not available right now." });
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        // "not_set" follows the publication's double opt-in setting in Beehiiv.
        double_opt_override: "not_set",
        utm_source: "matchadev.com",
        utm_medium: "landing_page",
        referring_site: req.headers.get("referer") || "https://matchadev.com",
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    console.error(`Beehiiv subscription failed (${response.status}): ${detail}`);
    const status = response.status === 429 ? 429 : 502;
    return json(status, { ok: false, error: "Something went wrong. Please try again in a moment." });
  }

  return json(200, { ok: true });
};

export const config = {
  path: "/api/subscribe",
};
