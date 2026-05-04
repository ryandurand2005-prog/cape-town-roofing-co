export interface ValidationResult {
  valid:  boolean;
  errors: Record<string, string>;
}

export function validate(data: Record<string, string>): ValidationResult {
  const errors: Record<string, string> = {};

  // name
  const name = (data.name ?? '').trim();
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  } else if (!/^[\p{L}\s'\-]+$/u.test(name)) {
    errors.name = 'Name may only contain letters, spaces, hyphens, and apostrophes.';
  }

  // phone (optional field — validate only if provided)
  const phone = (data.phone ?? '').trim();
  if (phone && !/^[\d\s+\-().]{7,20}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  // email
  const email = (data.email ?? '').trim();
  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  // message
  const message = (data.message ?? '').trim();
  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (message.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
