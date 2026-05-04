export interface SanitisedPayload {
  name:     string;
  phone:    string;
  phoneRaw: string;
  email:    string;
  service:  string;
  message:  string;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '');
}

function normaliseWhitespace(str: string): string {
  return str.trim().replace(/\s{2,}/g, ' ');
}

export function sanitise(data: Record<string, string>): SanitisedPayload {
  const clean = (val: string) => normaliseWhitespace(stripHtml(val ?? ''));

  const phone    = clean(data.phone ?? '');
  const phoneRaw = phone.replace(/[^\d+]/g, '');

  return {
    name:     clean(data.name    ?? ''),
    phone,
    phoneRaw,
    email:    clean(data.email   ?? '').toLowerCase(),
    service:  clean(data.service ?? ''),
    message:  clean(data.message ?? ''),
  };
}
