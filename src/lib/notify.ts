import type { SanitisedPayload } from './sanitise';

export interface NotifyPayload extends SanitisedPayload {
  submittedAt: string;
  score:       number;
}

export async function sendToN8n(payload: NotifyPayload): Promise<boolean> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.includes('placeholder')) {
    console.warn('[notify] N8N_WEBHOOK_URL not configured — skipping n8n');
    return false;
  }

  try {
    const res = await fetch(webhookUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
      signal:  AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (err) {
    console.error('[notify] n8n request failed:', err);
    return false;
  }
}

export async function sendFallbackEmail(payload: NotifyPayload): Promise<boolean> {
  const apiKey         = process.env.RESEND_API_KEY;
  const clientEmail    = process.env.CLIENT_NOTIFY_EMAIL;
  const backupEmail    = process.env.BACKUP_NOTIFY_EMAIL;
  const clientName     = process.env.CLIENT_NAME ?? 'Client';

  if (!apiKey || apiKey.includes('placeholder')) {
    console.warn('[notify] RESEND_API_KEY not configured — skipping fallback email');
    return false;
  }

  const subject = `[LEAD] ${payload.name} — ${payload.service || 'General Enquiry'} — ${clientName}`;
  const html = `
    <h2>New Lead — ${clientName}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${payload.name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${payload.phone || '—'}</td></tr>
      <tr><td><strong>Email</strong></td><td>${payload.email}</td></tr>
      <tr><td><strong>Service</strong></td><td>${payload.service || '—'}</td></tr>
      <tr><td><strong>Message</strong></td><td>${payload.message}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${payload.submittedAt}</td></tr>
    </table>
    <p style="color:#6b7280;font-size:12px;">Sent via BluePrint Studio fallback (n8n unavailable).</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    `BluePrint Studio Leads <leads@blueprintstudio.co.za>`,
        to:      [clientEmail, backupEmail].filter(Boolean),
        subject,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch (err) {
    console.error('[notify] Resend fallback failed:', err);
    return false;
  }
}
