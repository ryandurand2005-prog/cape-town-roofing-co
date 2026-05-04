type Outcome = 'success_n8n' | 'success_resend' | 'failure' | 'honeypot' | 'validation_error' | 'recaptcha_fail';

interface LogEntry {
  outcome:    Outcome;
  clientName: string;
  name:       string;
  phone:      string;
  email:      string;
  service:    string;
  score:      number;
  timestamp:  string;
}

export function log(entry: Omit<LogEntry, 'timestamp' | 'clientName'>): void {
  const record: LogEntry = {
    ...entry,
    clientName: import.meta.env.CLIENT_NAME ?? 'unknown',
    timestamp:  new Date().toISOString(),
  };
  console.log(JSON.stringify(record));
}
