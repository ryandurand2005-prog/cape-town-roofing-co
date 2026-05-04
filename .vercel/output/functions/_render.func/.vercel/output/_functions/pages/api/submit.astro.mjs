export { renderers } from '../../renderers.mjs';

function validate(data) {
  const errors = {};
  const name = (data.name ?? "").trim();
  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  } else if (!/^[\p{L}\s'\-]+$/u.test(name)) {
    errors.name = "Name may only contain letters, spaces, hyphens, and apostrophes.";
  }
  const phone = (data.phone ?? "").trim();
  if (phone && !/^[\d\s+\-().]{7,20}$/.test(phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  const email = (data.email ?? "").trim();
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  const message = (data.message ?? "").trim();
  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 2e3) {
    errors.message = "Message must be 2000 characters or fewer.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

function stripHtml(str) {
  return str.replace(/<[^>]*>/g, "");
}
function normaliseWhitespace(str) {
  return str.trim().replace(/\s{2,}/g, " ");
}
function sanitise(data) {
  const clean = (val) => normaliseWhitespace(stripHtml(val ?? ""));
  const phone = clean(data.phone ?? "");
  const phoneRaw = phone.replace(/[^\d+]/g, "");
  return {
    name: clean(data.name ?? ""),
    phone,
    phoneRaw,
    email: clean(data.email ?? "").toLowerCase(),
    service: clean(data.service ?? ""),
    message: clean(data.message ?? "")
  };
}

async function verifyRecaptcha(token) {
  {
    return { valid: true, score: 1 };
  }
}

async function sendToN8n(payload) {
  const webhookUrl = "https://placeholder.n8n.cloud/webhook/test";
  if (webhookUrl.includes("placeholder")) {
    console.warn("[notify] N8N_WEBHOOK_URL not configured — skipping n8n");
    return false;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8e3)
    });
    return res.ok;
  } catch (err) {
    console.error("[notify] n8n request failed:", err);
    return false;
  }
}
async function sendFallbackEmail(payload) {
  const apiKey = "re_test_placeholder";
  const clientEmail = "test@test.com";
  const backupEmail = "ryandurand2005@gmail.com";
  const clientName = "Cape Town Roofing Co.";
  if (apiKey.includes("placeholder")) {
    console.warn("[notify] RESEND_API_KEY not configured — skipping fallback email");
    return false;
  }
  const subject = `[LEAD] ${payload.name} — ${payload.service || "General Enquiry"} — ${clientName}`;
  const html = `
    <h2>New Lead — ${clientName}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${payload.name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${payload.phone || "—"}</td></tr>
      <tr><td><strong>Email</strong></td><td>${payload.email}</td></tr>
      <tr><td><strong>Service</strong></td><td>${payload.service || "—"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${payload.message}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${payload.submittedAt}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:12px;">Sent via BluePrint Studio fallback (n8n unavailable).</p>
  `;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `BluePrint Studio Leads <leads@blueprintstudio.co.za>`,
        to: [clientEmail, backupEmail].filter(Boolean),
        subject,
        html
      }),
      signal: AbortSignal.timeout(8e3)
    });
    return res.ok;
  } catch (err) {
    console.error("[notify] Resend fallback failed:", err);
    return false;
  }
}

function log(entry) {
  const record = {
    ...entry,
    clientName: "Cape Town Roofing Co.",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  console.log(JSON.stringify(record));
}

const prerender = false;
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request body." }, 400);
  }
  if (body._honeypot) {
    log({ outcome: "honeypot", name: "", phone: "", email: "", service: "", score: 0 });
    return json({ success: true });
  }
  const { valid, errors } = validate(body);
  if (!valid) {
    log({ outcome: "validation_error", name: body.name ?? "", phone: body.phone ?? "", email: body.email ?? "", service: body.service ?? "", score: 0 });
    return json({ success: false, errors }, 400);
  }
  const { valid: captchaOk, score } = await verifyRecaptcha(body.recaptchaToken ?? "");
  if (!captchaOk) {
    log({ outcome: "recaptcha_fail", name: body.name, phone: body.phone ?? "", email: body.email, service: body.service ?? "", score });
    return json({ success: false, message: "reCAPTCHA verification failed. Please try again." }, 400);
  }
  const payload = {
    ...sanitise(body),
    submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
    score
  };
  const n8nOk = await sendToN8n(payload);
  if (n8nOk) {
    log({ outcome: "success_n8n", ...payload });
    return json({ success: true });
  }
  const resendOk = await sendFallbackEmail(payload);
  if (resendOk) {
    log({ outcome: "success_resend", ...payload });
    return json({ success: true });
  }
  log({ outcome: "failure", ...payload });
  return json({ success: false, message: "We could not send your message. Please call us directly." }, 500);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
