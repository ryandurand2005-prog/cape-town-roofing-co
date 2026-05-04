const SCORE_THRESHOLD = 0.5;
const VERIFY_URL      = 'https://www.google.com/recaptcha/api/siteverify';

export interface RecaptchaResult {
  valid: boolean;
  score: number;
}

export async function verifyRecaptcha(token: string): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey || secretKey === 'test_key_placeholder') {
    // Fail-open in development when no real key is configured
    return { valid: true, score: 1.0 };
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    new URLSearchParams({ secret: secretKey, response: token }),
      signal:  AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.warn('[recaptcha] Verify API returned non-200 — failing open');
      return { valid: true, score: -1 };
    }

    const json = await res.json() as { success: boolean; score: number };
    const score = json.score ?? 0;
    return { valid: json.success && score >= SCORE_THRESHOLD, score };

  } catch (err) {
    console.warn('[recaptcha] Verify request failed — failing open:', err);
    return { valid: true, score: -1 };
  }
}
