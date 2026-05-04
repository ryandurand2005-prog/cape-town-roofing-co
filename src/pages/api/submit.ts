export const prerender = false;

import type { APIRoute } from 'astro';
import { validate }        from '@/lib/validate';
import { sanitise }        from '@/lib/sanitise';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { sendToN8n, sendFallbackEmail } from '@/lib/notify';
import { log }             from '@/lib/logger';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {

  // 1. Parse body
  let body: Record<string, string>;
  try {
    body = await request.json() as Record<string, string>;
  } catch {
    return json({ success: false, message: 'Invalid request body.' }, 400);
  }

  // 2. Honeypot check
  if (body._honeypot) {
    log({ outcome: 'honeypot', name: '', phone: '', email: '', service: '', score: 0 });
    return json({ success: true }); // fake success — bot doesn't know
  }

  // 3. Validation
  const { valid, errors } = validate(body);
  if (!valid) {
    log({ outcome: 'validation_error', name: body.name ?? '', phone: body.phone ?? '', email: body.email ?? '', service: body.service ?? '', score: 0 });
    return json({ success: false, errors }, 400);
  }

  // 4. reCAPTCHA
  const { valid: captchaOk, score } = await verifyRecaptcha(body.recaptchaToken ?? '');
  if (!captchaOk) {
    log({ outcome: 'recaptcha_fail', name: body.name, phone: body.phone ?? '', email: body.email, service: body.service ?? '', score });
    return json({ success: false, message: 'reCAPTCHA verification failed. Please try again.' }, 400);
  }

  // 5. Sanitise
  const payload = {
    ...sanitise(body),
    submittedAt: new Date().toISOString(),
    score,
  };

  // 6. Try n8n
  const n8nOk = await sendToN8n(payload);
  if (n8nOk) {
    log({ outcome: 'success_n8n', ...payload });
    return json({ success: true });
  }

  // 7. Fallback to Resend
  const resendOk = await sendFallbackEmail(payload);
  if (resendOk) {
    log({ outcome: 'success_resend', ...payload });
    return json({ success: true });
  }

  // 8. Total failure
  log({ outcome: 'failure', ...payload });
  return json({ success: false, message: 'We could not send your message. Please call us directly.' }, 500);
};
